const express = require('express');
const passport = require('passport');
const router = express.Router();

// User Signin Route
router.get('/signin', (req, res) => {
    res.render('signin');
});

// User Signup Route
router.get('/signup', (req, res) => {
    res.render('signup', {message: req.flash('info')})
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
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;