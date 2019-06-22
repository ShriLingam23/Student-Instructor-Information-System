const SubmissionSchema = require('../models/submission-model');

const SubmissionController = function () {

    this.insert = (data) => {
        return new Promise((resolve, reject) => {
            let submission = new SubmissionSchema(data);

            submission.save().then(() => {
                resolve({status: 200, message: 'Submission Added Successfully'});
            }).catch(err => {
                reject({status: 500, message: 'Error : ' + err});
            })
        })
    };

    this.find = (id) => {
        return new Promise((resolve, reject) => {
            SubmissionSchema.find({assessment:id}).then((data) => {
                resolve({status: 200, data:data});
            }).catch(err => {
                reject({status: 500, message: 'Error : ' + err});
            })
        })
    };

    this.findCourseAssessments = (id) => {
        return new Promise((resolve, reject) => {
            SubmissionSchema.find({course_id:id}).then((data) => {
                resolve({status: 200, data:data});
            }).catch(err => {
                reject({status: 500, message: 'Error : ' + err});
            })
        })
    };

    this.findAll = () => {
        return new Promise((resolve, reject) => {
            SubmissionSchema.find().populate('assessment').exec().then((data) => {
                resolve({status: 200, data:data});
            }).catch(err => {
                reject({status: 500, message: 'Error : ' + err});
            })
        })
    };

    this.update = (id,data) => {
        return new Promise((resolve, reject) => {
            SubmissionSchema.updateOne({_id:id},data).then(() => {
                resolve({status: 200, message: 'Submission Updated Successfully'});
            }).catch(err => {
                reject({status: 500, message: 'Error : ' + err});
            })
        })
    };

    this.delete = (id) => {
        return new Promise((resolve, reject) => {
            SubmissionSchema.deleteOne({_id:id}).then(() => {
                resolve({status: 200, message: 'Submission Deleted Successfully'});
            }).catch(err => {
                reject({status: 500, message: 'Error : ' + err});
            })
        })
    };
};

module.exports = new SubmissionController();