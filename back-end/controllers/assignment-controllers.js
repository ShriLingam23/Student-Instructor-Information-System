const AssignmentSchema = require('../models/assignment-model');

const AssignmentController = function () {

    this.insert = (data) => {
        return new Promise((resolve, reject) => {
            let assignment = new AssignmentSchema(data);

            assignment.save().then(() => {
                resolve({status: 200, message: 'Assignment Added Successfully'});
            }).catch(err => {
                reject({status: 500, message: 'Error : ' + err});
            })
        })
    };

    this.find = (id) => {
        return new Promise((resolve, reject) => {
            AssignmentSchema.find({_id:id}).then((data) => {
                resolve({status: 200, data:data});
            }).catch(err => {
                reject({status: 500, message: 'Error : ' + err});
            })
        })
    };

    this.findAll = () => {
        return new Promise((resolve, reject) => {
            AssignmentSchema.find().then((data) => {
                resolve({status: 200, data:data});
            }).catch(err => {
                reject({status: 500, message: 'Error : ' + err});
            })
        })
    };

    this.update = (id,data) => {
        return new Promise((resolve, reject) => {
            AssignmentSchema.updateOne({_id:id},data).then((data) => {
                resolve({status: 200, message: 'Assignment Updated Successfully'});
            }).catch(err => {
                reject({status: 500, message: 'Error : ' + err});
            })
        })
    };

    this.delete = (id) => {
        return new Promise((resolve, reject) => {
            AssignmentSchema.deleteOne({_id:id}).then((data) => {
                resolve({status: 200, message: 'Assignment Deleted Successfully'});
            }).catch(err => {
                reject({status: 500, message: 'Error : ' + err});
            })
        })
    };
};

module.exports = new AssignmentController();