const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let AssessmentSchema = new Schema({
    course_id: {
        type: Schema.Types.ObjectId,
        ref: 'Course'
    },
    assigned_date: {
        type: String,
        required : true
    },
    modified_date: {
        type: String,
        required : true
    },
    due_date: {
        type: String,
        required : true
    },
    link_name: {
        type: String,
        required : true
    },
    file_name: {
        type: String,
        required : true
    },
    file_url: {
        type: String,
        required : true
    },
    file_ext: {
        type: String,
        required : true
    },
    file_type: {
        type: String,
        required : true
    }
});

module.exports = mongoose.model('Assessment', AssessmentSchema);