const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CourseNotificationSchema = new Schema({
    staff: {
        type: Schema.Types.ObjectId,
        ref: 'Staff'
    },
    course: {
        type: Schema.Types.ObjectId,
        ref: 'Course'
    },
    status: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('CourseNotification', CourseNotificationSchema);