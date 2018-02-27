const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const studentSchema = new Schema({
    email: String,
    password: String,
    givenName: String
})

//callback function definition using the pre method
studentSchema.pre('save', function (next) {
    const user = this;

    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, null, (err, hash) => {
            if (err) return next(err);

            user.password = hash;

            next();
        })
    })
})

studentSchema.methods.comparePasswords = function (candidate, callback) {
    bcrypt.compare(candidate, this.password, (err, isMatch) => {
        if (err) return callback(err);

        callback(null, isMatch)
    })
}

//create model for 'student' collection
const ModelClass = mongoose.model('student', studentSchema)

module.exports = ModelClass