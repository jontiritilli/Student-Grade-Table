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
    var students = Student.find({}, (err, studentResult) => {
        if (err) {
            req.flash('error', 'Failed to load student list. Please try reloading the page')
            res.render('students', {message: req.flash('error')});
        } else if (studentResult.length) {
            res.render('students', {
                'studentList': studentResult,
                user: req.user,
            });
        } else {
            req.flash('error', 'Student List is empty. Please add something.')
            res.render('students', {
                'studentList': studentResult,
                messages: req.flash('error')
            })
        }
    });
});

// Add Student
router.post('/add', ensureAuth, (req, res,) => {
    let errors = [];

    const { name, course, grade }= req.body
    const newStudent = new Student();
    if(!name && name.length < 2){
        errors.push('Please enter a name with at least 2 letters')
    }
    if(!course && course.length < 2){
        errors.push('Please enter a name with at least 2 letters')
    }
    if(!grade && grade.length < 1 || grade > 100 || grade < 0){
        errors.push('Please enter a name with at least 2 letters')
    } else if (grade > 100 || grade < 0){
        errors.push('Please enter a grade between 0 - 100')
    }

    if(errors.length > 0) {
        req.flash('error', errors)
        res.render('students', {
            messages: req.flash('error')
        })
    }
    newStudent.name = name;
    newStudent.course = course;
    newStudent.grade = grade;
    newStudent.save()
        .then(
            res.redirect(301, '/student/list')
        )
        .catch(Student.find({}, (err, studentResult) => {
            req.flash('error', 'Error adding student to database')
            res.render('students', {
                message: req.flash('error'),
                'studentList': studentResult
            });
        }))
});

// Delete Student
router.get('/remove/:id', ensureAuth, (req, res) => {
    console.log(req.params)
    Student.remove({_id: req.params.id})
        .then(() => {
            req.flash('success', 'Student removed');
            res.redirect('/student/list');
        });
});

module.exports = router;