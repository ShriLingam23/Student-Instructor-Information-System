const CourseSchema = require('../models/course-model');

const CourseController = function () {
    this.insert = (data) => {
        return new Promise((resolve, reject) => {
            let course = new CourseSchema(data);

            course.save().then(() => {
                resolve({status: 200, message: 'Course Added Successfully'});
            }).catch(err => {
                reject({status: 500, message: 'Error : ' + err});
            })
        })
    };

    this.findAll = () => {
        return new Promise((resolve, reject) => {
            CourseSchema.find().then((data) => {
                resolve({status: 200, data: data});
            }).catch(err => {
                reject({status: 500, message: 'Error : ' + err});
            })
        })
    };

    this.find = (id) => {
        return new Promise((resolve, reject) => {
            CourseSchema.findOne({_id: id}).then((data) => {
                resolve({status: 200, data: data});
            }).catch(err => {
                reject({status: 500, message: 'Error : ' + err});
            })
        })
    };

    this.findStudentList = (id) => {
        return new Promise((resolve, reject) => {
            CourseSchema.findOne({_id:id}).select('students').then((data) => {
                resolve({status: 200, data: data});
            }).catch(err => {
                reject({status: 500, message: 'Error : ' + err});
            })
        })
    };

    this.update = (courseId, instructorId) => {
        return new Promise((resolve, reject) => {

            CourseSchema.findOne({_id: courseId}).then((data) => {
                let instructors = data.instructors;

                if (!instructors.includes(instructorId))
                    instructors.push(instructorId);

                CourseSchema.updateOne({_id: courseId}, {instructors: instructors}).then(() => {
                    resolve({status: 200, message: 'Course-Instructor Updated Successfully'});
                }).catch(err => {
                    reject({status: 500, message: 'Error : ' + err});
                })
            });
        })
    };

};

module.exports = new CourseController();