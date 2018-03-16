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
    const { firstName, lastName, email, password } = req.body;

    if(!firstName || !lastName || !email || !password){
        const errors = [];
        if (!firstName) {
            errors.push('no email provided')
        }
        if (!lastName) {
            errors.push('no password provided')
        }
        if (!email) {
            errors.push('no first name provided')
        }
        if (!password) {
            errors.push('no last name provided')
        }

        return res.status(422).send(errors);
    }
    User.findOne({email}, (err, existingUser)=>{
        if(err) return next(err);

        if(existingUser){
            return res.status(422).send(['Email is in use'])
        }

        const newUser = new User({ firstName, lastName, email, password })

        newUser.save((err)=>{
            if(err) return next(err);

            res.send({token: token(newUser)})
        })
    })
}

exports.signin = (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.send(401, { success: false, message: 'Incorrect email or password'});
    }
    
    return res.send({ token: token(req.user), success: true, message: 'authentication succeeded'});
}