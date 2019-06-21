const CourseNotificationSchema = require('../models/course-notification-model');

const CourseNotificationController = function () {

    this.insert = (data) => {
        return new Promise((resolve, reject) => {
            let notification = new CourseNotificationSchema(data);

            notification.save().then(() => {
                resolve({status: 200, message: 'Notification Added Successfully'});
            }).catch(err => {
                reject({status: 500, message: 'Error : ' + err});
            })
        })
    };

    this.findAll = () => {
        return new Promise((resolve, reject) => {
            CourseNotificationSchema.find().then((data) => {
                resolve({status: 200, data: data});
            }).catch(err => {
                reject({status: 500, message: 'Error : ' + err});
            })
        })
    };

    this.findInstructorNotifications = (id) => {
        return new Promise((resolve, reject) => {
            CourseNotificationSchema.find({instructor: id}).populate('course').exec().then((data) => {
                resolve({status: 200, data: data});
            }).catch(err => {
                reject({status: 500, message: 'Error : ' + err});
            })
        })
    };

    this.update = (id,data) => {
        return new Promise((resolve, reject) => {
            CourseNotificationSchema.updateOne({_id:id},data).then(() => {
                resolve({status: 200, message: 'Notification Updated Successfully'});
            }).catch(err => {
                reject({status: 500, message: 'Error : ' + err});
            })
        })
    };

    this.delete = (id) => {
        return new Promise((resolve, reject) => {
            CourseNotificationSchema.deleteOne({_id: id}).then(() => {
                resolve({status: 200, message: 'Notification Deleted Successfully'});
            }).catch(err => {
                reject({status: 500, message: 'Error : ' + err});
            })
        })
    };

};

module.exports = new CourseNotificationController();