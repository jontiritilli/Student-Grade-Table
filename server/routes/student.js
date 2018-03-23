const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const { ensureAuth } = require('../helpers/ensureAuth');
const configDB = require('../config/db');

// Load Student Model
require('../models/Students');
const Student = mongoose.model('students');

// Student Course Route
router.get('/list', ensureAuth, (req, res) => {
    var students = Student.find({}, (err, studentResult) => {
        if (err) {
            req.flash('failure_msg', 'Failed to load student list. Please try reloading the page')
            res.render('students', {message: req.flash('failure_msg')});
        } else if (studentResult.length) {
            res.render('students', {
                'studentList': studentResult,
                user: req.user,
            });
        } else {
            req.flash('failure_msg', 'Student List is empty. Please add something.')
            res.render('students', {
                'studentList': studentResult,
                messages: req.flash('failure_msg')
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
        req.flash('failure_msg', errors)
        res.render('students', {
            message: req.flash('failure_msg')
        })
    }
    newStudent.name = name;
    newStudent.course = course;
    newStudent.grade = grade;
    newStudent.save()
        .then(student => {
            res.redirect('/student/list');
        })
        .catch(err => {
            res.render('students', {
                message: req.flash('error adding student')
            });
        })
});

// Delete Student
router.get('/remove/:id', ensureAuth, (req, res) => {
    console.log(req.params)
    Student.remove({_id: req.params.id})
        .then(() => {
            req.flash('success_msg', 'Student removed');
            res.redirect('/student/list');
        });
});

module.exports = router;