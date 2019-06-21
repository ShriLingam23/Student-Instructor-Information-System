const InstructorSchema = require('../models/instructor-model');

const InstructorController = function () {

    this.register = (data) => {
        return new Promise((resolve, reject) => {
            let instructor = new InstructorSchema(data);

            instructor.save().then(() => {
                resolve({status: 200, message: 'Instructor Created Successfully'});
            }).catch(err => {
                reject({status: 500, message: 'Error : ' + err});
            })
        })
    };

    this.findAll = () => {
        return new Promise((resolve, reject) => {
            InstructorSchema.find().then((data) => {
                resolve({status: 200, data: data});
            }).catch(err => {
                reject({status: 500, message: 'Error : ' + err});
            })
        })
    };

    this.find = (id) => {
        return new Promise((resolve, reject) => {
            InstructorSchema.findOne({_id: id}).then((data) => {
                resolve({status: 200, data: data});
            }).catch(err => {
                reject({status: 500, message: 'Error : ' + err});
            })
        })
    };


    this.update = (courseId, instructorId) => {
        return new Promise((resolve, reject) => {

            InstructorSchema.findOne({_id: courseId}).then((data) => {
                let instructors = data.instructors;

                if (!instructors.includes(instructorId))
                    instructors.push(instructorId);

                InstructorSchema.updateOne({_id: courseId}, {instructors: instructors}).then(() => {
                    resolve({status: 200, message: 'Course-Instructor Updated Successfully'});
                }).catch(err => {
                    reject({status: 500, message: 'Error : ' + err});
                })
            });
        })
    };

};

module.exports = new InstructorController();