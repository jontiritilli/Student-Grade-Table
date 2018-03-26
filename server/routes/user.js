const express = require('express');
const passport = require('passport');
const { ensureAuth } = require('../helpers/ensureAuth');
const router = express.Router();

// User Signin Route
router.get('/signin', (req, res) => {
    res.render('signin', {
        messages: req.flash('info')
    });
});

// User Signup Route
router.get('/signup', (req, res) => {
    res.render('signup', {
        messages: req.flash('signupMessage')
    });
})

// SignIN Form POST
router.post('/signin',
    passport.authenticate('local-login', {
        successRedirect: '/student/list',
        failureRedirect: '/user/signin',
        failureFlash: true
    })
);

// SignUP Form POST
router.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/user/signin',
    failureRedirect : '/user/signup',
    failureFlash : true
}));

// Logout User
router.get('/logout', ensureAuth, (req, res) => {
    req.logout();
    req.flash('logout', 'Logout was successful')
    res.redirect('/');
});

module.exports = router;