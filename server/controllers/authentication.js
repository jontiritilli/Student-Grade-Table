const jwt = require('jwt-simple');
const User = require('../models/users');
const { secret } = require('../config')


function token (user) {
    const ts = new Date().getTime();

    return jwt.encode({
        uid: user.id,
        ts: ts
    }, secret);
}

exports.signup = (req, res, next) => {
    const { email, password, givenName, familyName } = req.body;

    if(!email || !password || !givenName || !familyName){
        const errors = [];
        if (!email) {
            errors.push('no email provided')
        }
        if (!password) {
            errors.push('no password provided')
        }
        if (!givenName) {
            errors.push('no first name provided')
        }
        if (!familyName) {
            errors.push('no last name provided')
        }

        return res.status(422).send(errors);
    }
    User.findOne({email}, (err, existingUser)=>{
        if(err) return next(err);

        if(existingUser){
            return res.status(422).send(['Email is in use'])
        }

        const newUser = new User({email, password, givenName, familyName})

        newUser.save((err)=>{
            if(err) return next(err);

            res.send({token: token(newUser)})
        })
    })
}

exports.signin = (req, res, next) => {
    res.send({
        token: token(req.user)
    })
}