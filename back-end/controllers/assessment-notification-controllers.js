const AssessmentNotificationSchema = require('../models/course-model');

const AssessmentNotificationController = function () {
    this.insert = (data) => {
        return new Promise((resolve, reject) => {
            let notification = new AssessmentNotificationSchema(data);

            notification.save().then(() => {
                resolve({status: 200, message: 'Notification Added Successfully'});
            }).catch(err => {
                reject({status: 500, message: 'Error : ' + err});
            })
        })
    };

    this.find = (id) => {
        return new Promise((resolve, reject) => {
            AssessmentNotificationSchema.find({_id:id}).then((data) => {
                resolve({status: 200, data:data});
            }).catch(err => {
                reject({status: 500, message: 'Error : ' + err});
            })
        })
    };


    this.findAll = () => {
        return new Promise((resolve, reject) => {
            AssessmentNotificationSchema.find().then((data) => {
                resolve({status: 200, data:data});
            }).catch(err => {
                reject({status: 500, message: 'Error : ' + err});
            })
        })
    };
};

module.exports = new AssessmentNotificationController();