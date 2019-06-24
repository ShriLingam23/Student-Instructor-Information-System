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
            CourseSchema.findOne({_id: id}).select('students').then((data) => {
                resolve({status: 200, data: data});
            }).catch(err => {
                reject({status: 500, message: 'Error : ' + err});
            })
        })
    };

    this.update = (courseId, staffId) => {
        return new Promise((resolve, reject) => {

            CourseSchema.findOne({_id: courseId}).then((data) => {
                let staffs = data.staffs;

                if (!staffs.includes(staffId))
                    staffs.push(staffId);

                CourseSchema.updateOne({_id: courseId}, {staffs: staffs}).then(() => {
                    resolve({status: 200, message: 'Course-Instructor Updated Successfully'});
                }).catch(err => {
                    reject({status: 500, message: 'Error : ' + err});
                })
            });
        })
    };

    this.updateStudent = (id, stuId) => {
        return new Promise((resolve, reject) => {
            CourseSchema.findOne({_id: id}).then((data) => {
                let students = data.students;

                if (!students.includes(stuId))
                    students.push(stuId);

                CourseSchema.updateOne({_id: id}, {students: students}).then(() => {
                    resolve({status: 200, message: 'Course Updated Successfully'});
                }).catch(err => {
                    reject({status: 500, message: 'Error : ' + err});
                })
            });
        })
    };
}
module.exports = new CourseController();