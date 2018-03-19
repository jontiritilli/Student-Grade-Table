const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const { ensureAuthenticated } = require('../helpers/ensureAuth');

// Load Ideas Model
require('../models/Students');
const Students = mongoose.model('students');

// Add Students
router.get('/add/:id', ensureAuthenticated, (req, res) => {
    Classes.findOne({
        teacher: req.user,
        _id: req.params.id
    })
        .then((classObj) => {
            Students.find()
                .then((students) => {

                    const firstRan = (Math.floor(Math.random() * 10) + 10);
                    let studentArr = [];

                    for (let i = 0; i < firstRan; i++) {
                        let rndNum = Math.floor(Math.random() * 49);
                        studentArr.push(students[rndNum]);
                    }

                    Classes.update(
                        { _id: classObj._id },
                        { $addToSet: { students: { $each: studentArr } } },
                        { upsert: true },
                        function (err, raw) {
                            console.log(raw);
                        });

                    Students.updateMany(
                        { _id: studentArr },
                        { $addToSet: { classes: classObj } },
                        { upsert: true },
                        function (err, raw) {
                            console.log(raw);
                        });

                    req.flash('success_msg', 'Students Added');
                    res.redirect('/classes');
                })
        });
});

// Delete Students
router.delete('/:id', ensureAuthenticated, (req, res) => {
    Students.remove({ _id: req.params.id })
        .then(() => {
            req.flash('success_msg', 'Student removed');
            res.redirect('../classes/')
        });
});

module.exports = router;