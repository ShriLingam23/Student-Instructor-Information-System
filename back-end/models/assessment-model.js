const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let AssessmentSchema = new Schema({
    course_id: {
        type: Schema.Types.ObjectId,
        ref: 'Course'
    },
    assigned_date: {
        type: String
    },
    modified_date: {
        type: String
    },
    due_date: {
        type: String
    },
    link_name: {
        type: String
    },
    file_name: {
        type: String
    },
    file_url: {
        type: String
    },
    file_ext: {
        type: String
    },
    file_type: {
        type: String
    }
});

module.exports = mongoose.model('Assessment', AssessmentSchema);