const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const { ensureAuth } = require('../helpers/ensureAuth');
const configDB = require('../config/db');

// Load Student Model
require('../models/students');
const Student = mongoose.model('students');

// Student Course Route
router.get('/list', ensureAuth, (req, res) => {
    let studentResult
    Student.find({}, (err, students) => {
        studentResult = students;
    })
    .then( (studentResult) => {
            if (studentResult.length) {
                res.render('students', {
                    'studentList': studentResult,
                    messages: req.flash('info'),
                    user: req.user
                });
            } else {
                req.flash('info', 'Student List is empty. Please add something')
                res.render('students', {
                    'studentList': studentResult,
                    messages: req.flash('info'),
                    user: req.user
                });
            }
        }
    )
});

// Add Student
router.post('/add', ensureAuth, (req, res,) => {
    let errors = [];

    const { name, course, grade }= req.body
    const newStudent = new Student();

    if(!name || name.length < 2){
        errors.push('Please enter a name with at least 2 letters')
    }
    if(!course || course.length < 2){
        errors.push('Please enter a name with at least 2 letters')
    }
    if(!grade || grade.length < 1 || grade.length > 5){
        errors.push('Please enter at least one number, no more than 4')
    } else if (grade > 100 || grade < 0){
        errors.push('Please enter a grade between 0 - 100')
    }

    if(errors.length > 0) {
        req.flash('info', errors)
        res.redirect('students')
    }
    newStudent.name = name;
    newStudent.course = course;
    newStudent.grade = grade.toFixed(2);
    newStudent.save()
        .then(() => {
            req.flash('info', 'Student added successfully');
            res.redirect(301, '/student/list');
        })
        .catch((err) => {
            req.flash('info', 'Error adding student to database');
            res.redirect(301, '/student/list');
        })
});

// Delete Student
router.get('/remove/:id', ensureAuth, (req, res) => {
    Student.remove({_id: req.params.id})
        .then(() => {
            req.flash('info', 'Student removed successfully.');
            res.redirect(301, '/student/list');
        });
});

// Edit Student
router.post('/update', ensureAuth, (req, res) => {
  let errors = [];
  const { studentId, name, course, grade } = req.body;

  if(!name || name.length < 2){
      errors.push('Please enter a name with at least 2 letters')
  }
  if(!course || course.length < 2){
      errors.push('Please enter a name with at least 2 letters')
  }
  if(!grade || grade.length < 1 || grade.length > 5){
      errors.push('Please enter at least one number, no more than 4')
  } else if (grade > 100 || grade < 0){
      errors.push('Please enter a grade between 0 - 100')
  }

  if(errors.length > 0) {
      req.flash('info', errors)
      res.redirect(301, '/student/list');
  }

  Student.findByIdAndUpdate(studentId, {$set: {name: name, course: course, grade: grade}}, {new: true}, (err, student) => {
    if(err){
      res.flash('info', err);
      res.redirect(301, '/student/list');
    };
    req.flash('info', 'Student updated successfully.');
    res.redirect(301, '/student/list');
  });
})
module.exports = router;