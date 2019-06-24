const AssessmentSchema = require('../models/assessment-model');

const AssessmentController = function () {

    this.insert = (data) => {
        return new Promise((resolve, reject) => {
            let assessment = new AssessmentSchema(data);

            assessment.save().then((data) => {
                resolve({status: 200, message: 'Assessment Added Successfully',data:data});
            }).catch(err => {
                reject({status: 500, message: 'Error : ' + err});
            })
        })
    };

    this.findAll = () => {
        return new Promise((resolve, reject) => {
            AssessmentSchema.find().then((data) => {
                resolve({status: 200, data:data});
            }).catch(err => {
                reject({status: 500, message: 'Error : ' + err});
            })
        })
    };

    this.find = (id) => {
        return new Promise((resolve, reject) => {
            AssessmentSchema.findOne({_id:id}).then((data) => {
                resolve({status: 200, data:data});
            }).catch(err => {
                reject({status: 500, message: 'Error : ' + err});
            })
        })
    };

    this.findCourseAssessments = (id) => {
        return new Promise((resolve, reject) => {
            AssessmentSchema.find({course_id:id}).then((data) => {
                resolve({status: 200, data:data});
            }).catch(err => {
                reject({status: 500, message: 'Error : ' + err});
            })
        })
    };

    this.update = (id,data) => {
        return new Promise((resolve, reject) => {
            AssessmentSchema.updateOne({_id:id},data).then(() => {
                resolve({status: 200, message: 'Assessment Updated Successfully'});
            }).catch(err => {
                reject({status: 500, message: 'Error : ' + err});
            })
        })
    };

    this.delete = (id) => {
        return new Promise((resolve, reject) => {
            AssessmentSchema.deleteOne({_id:id}).then(() => {
                resolve({status: 200, message: 'Assessment Deleted Successfully'});
            }).catch(err => {
                reject({status: 500, message: 'Error : ' + err});
            })
        })
    };
};

module.exports = new AssessmentController();