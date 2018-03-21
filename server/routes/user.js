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

// SignIN Form POST
router.post('/signin', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/courses',
        failureRedirect: '/signin',
        failureFlash: true
    })(req, res, next);
});

// SignUP Form POST
router.post('/signup', (req, res) => {
    console.log(req.body)
    let errors = [];

    if (req.body.password !== req.body.confirmPassword) {
        errors.push({ text: "Passwords do not match" });
    }

    if (req.body.password.length < 5) {
        errors.push({ text: "Password must be at least four characters" })
    }

    if (errors.length > 0) {
        //do something here to notify users of failure
        res.send(errors)
    } else {
        User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                res.redirect('/user/signup');
                //tell them that email already registered
            } else {
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                });
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, null, (err, hash) => {
                        if (err) {
                            return next(err);
                        }
                        newUser.password = hash;
                        newUser.save()
                        .then(user => {
                            res.redirect('/user/signin')
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
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/signin');
});



module.exports = router;