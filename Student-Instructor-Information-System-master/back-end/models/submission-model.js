const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let SubmissionSchema = new Schema({
    assessment: {
        type: Schema.Types.ObjectId,
        ref: 'Assessment'
    },
    student: {
        type: Schema.Types.ObjectId,
        ref: 'Student'
    },
    modified_date: {
        type: String,
        required : true
    },
    due_date_passed: {
        type: Boolean,
        default: false
    },
    is_uploaded: {
        type: Boolean,
        default: false
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
    marks: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Submission', SubmissionSchema);