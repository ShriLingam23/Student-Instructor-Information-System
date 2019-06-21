const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CourseSchema = new Schema({
    name: {
        type: String
    },
    instructors :[{
        type: Schema.Types.ObjectId,
        ref: 'Instructor'
    }],
    students :[{
        type: Schema.Types.ObjectId,
        ref: 'Student'
    }]
});

module.exports = mongoose.model('Course', CourseSchema);