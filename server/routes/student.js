const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const { ensureAuth } = require('../helpers/ensureAuth');

// Load Student Model
require('../models/Students');
const Students = mongoose.model('students');

// Student Course Route
router.get('/list', ensureAuth, (req, res) => {
    res.render('students');
});

// Add Student
router.get('/add/:id', ensureAuth, (req, res) => {
    Students.update(
        { _id: studentArr },
        { $addToSet: { classes: classObj } },
        { upsert: true },
        function (err, raw) {
            console.log(raw);
        }
    );
})

// Delete Student
router.delete('/:id', ensureAuth, (req, res) => {
    Students.remove({ _id: req.params.id })
        .then(() => {
            res.redirect('../students')
        });
});

module.exports = router;