const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let AssessmentNotificationSchema = new Schema({
    assessment: {
        type: Schema.Types.ObjectId,
        ref: 'Assessment'
    },
    students: [{
        type: Schema.Types.ObjectId,
        ref: 'Student'
    }]
});

module.exports = mongoose.model('AssessmentNotification', AssessmentNotificationSchema);