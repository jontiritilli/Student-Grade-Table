const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const studentSchema = new Schema({
    givenName: String,
    familyName: String,
    courses: Object
})

//create model for 'student' collection
const ModelClass = mongoose.model('student', studentSchema)

module.exports = ModelClass