const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
    full_name: {
        type: String,
        required : true
    },
    registration_id:{
        type: String,
        unique:true,
        required : true
    },
    email: {
        type: String,
        unique:true,
        required : true
    },
    phone: {
        type: String,
        required : true
    },
    campus: {
        type: String,
        required : true
    },
    password: {
        type: String,
        required : true
    },
    courses :[{
        type: Schema.Types.ObjectId,
        ref: 'Course'
    }],
    assessments :[{
        type: Schema.Types.ObjectId,
        ref: 'Assessment'
    }]
});

module.exports = mongoose.model('Student', StudentSchema);

