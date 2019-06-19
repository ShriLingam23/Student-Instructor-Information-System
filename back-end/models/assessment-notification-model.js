const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let AssessmentNotificationSchema = new Schema({
    student_id: [{
        type: Schema.Types.ObjectId,
        ref: 'Student'
    }],
    assessment_id: {
        type: Schema.Types.ObjectId,
        ref: 'Assessment'
    }
});

module.exports = mongoose.model('AssessmentNotification', AssessmentNotificationSchema);