const Student = require('../models/students');

exports.newStudent = (req, res, next) => {
    const { givenName, familyName, course } = req.body;

    if(!givenName || !familyName){
        const errors = [];
        if (!givenName) {
            errors.push('no first name provided')
        }
        if (!familyName) {
            errors.push('no last name provided')
        }
        return res.status(422).send(errors);
    }
    Student.findOne({email}, (err, existingUser)=>{
        if(err) return next(err);

        if(existingUser){
            return res.status(422).send(['Student already enrolled'])
        }

        const newUser = new User({email, password, givenName, familyName})

        newUser.save((err)=>{
            if(err) return next(err);

            res.send({token: token(newUser)})
        })
    })
}