const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const passport = require('passport');
const router = express.Router();

// Include User Model
require('../models/Users');
const User = mongoose.model('users');

// User Signin Route
router.get('/signin', (req, res) => {
    res.render('signin');
});

// User Signup Route
router.get('/signup', (req, res) => {
    res.render('signup')
})

// signin form POST
router.post('/signin', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/courses',
        failureRedirect: '/user/signin',
        failureFlash: true
    })(req, res, next);
});

// signup Form POST
router.post('/signup', (req, res) => {
    let errors = [];

    if (req.body.password !== req.body.confirmPassword) {
        errors.push({ text: "Passwords do not match" });
    }

    if (req.body.password.length < 8) {
        errors.push({ text: "Password must be at least four characters" })
    }

    if (errors.length > 0) {
        res.render('user/signup', {
            errors: errors,
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            confirmPassword: req.body.confirmPassword
        })
    } else {
        User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                res.redirect('/user/signup');
            } else {
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                });
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser.save()
                        .then(user => {
                            res.redirect('/users/login')
                        })
                        .catch(err => {
                            console.log(err);
                            return;
                        })
                    });
                });
            }
        });
    }
});

// Logout User
router.get('/user/logout', (req, res) => {
    req.logout();
    res.redirect('/user/login');
});



module.exports = router;