const passport = require('passport');
const User = require('../models/users');
const { secret } = require('../config');
const jwtStrategy = require('passport-jwt').Strategy;
const Extractjwt = require('passport-jwt').ExtractJwt;
const localStrategy = require('passport-local');

const localOptions= {
    usernameField: 'email'
}
// instantiate a new local strategy
const localLogin = new localStrategy(localOptions, (email, password, done)=> {
    User.findOne({email}, (err, user)=> {
        if(err) return done(err)
        if(!user) return done(null, false);
        user.comparePasswords(password, (err, isMatch) => {
            //check if error
            if(err) return done(err);
            //check if boolean is false
            if (!isMatch) return done(null, false);
            //if all is well, done, pass no error, and send user through
            done(null, user)
        })
    })
})

const jwtOptions = {
    jwtFromRequest: Extractjwt.fromHeader('authorization'),
    secretOrKey: secret
}

const jwtLogin = new jwtStrategy(jwtOptions, (payload, done)=>{
    User.findById(payload.uid, (err, user) => {
        if(err) return done(err);
        if(!user) return done(null, false);
        done(null, user);
    })
})

passport.use(jwtLogin);
passport.use(localLogin);