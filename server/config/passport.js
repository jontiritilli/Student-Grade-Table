const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
require('../models/users');
const User = mongoose.model('users');


module.exports = function (passport) {
    passport.serializeUser( (user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });

    passport.use('local-login', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    },
    (req, email, password, done) => {
        User.findOne({ 'email':  email.toLowerCase() }, (err, user) => {
            if (err)
                return done(err);
            if (!user)
                return done(null, false, req.flash('info', 'No user found.'));
            if (!user.comparePassword(password))
                return done(null, false, req.flash('info', 'Oops! Email or Password Incorrect'));
            return done(null, user);
        });
    }));

    passport.use('local-signup', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    },
    (req, email, password, done) => {
        process.nextTick( () => {
            User.findOne({ 'email': email.toLowerCase() }, (err, user) => {
                if (err)
                    return done(err);
                if (user) {
                    return done(null, false, req.flash('signupMessage', 'That email is already taken'));
                } else {
                    const newUser = new User();
                    newUser.email = email.toLowerCase();
                    newUser.password = newUser.generateHash(password);
                    newUser.save(err => {
                        if (err)
                            throw err;
                        return done(null, newUser, req.flash('info', 'Account created successfully'));
                    });
                }
            });
        });
    }));
};