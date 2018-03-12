const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    courseName: String,
    teacher: String,
    semester: String,
    students: Object
})

//create model for 'student' collection
const ModelClass = mongoose.model('student', studentSchema)

module.exports = ModelClass