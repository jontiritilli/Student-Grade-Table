const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    course: {
        type: String,
        required: true
    },
    grade: {
        type: Number,
        required: true
    }
});

mongoose.model('students', StudentSchema);