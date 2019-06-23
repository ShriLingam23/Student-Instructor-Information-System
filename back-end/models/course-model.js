const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CourseSchema = new Schema({
    courseId  :{
        type:String,
        required:true,
        unique: true
    },
    courseName:{
        type:String,
        required:true
    },
    enrollment:{
        type:String,
        required:true
    },
    faculty:{
        type:String,
        required:true
    },
    year:{
        type:Number,
        required:true
    },
    semester:{
        type:Number,
        required:true,
    },
    staffs :[{
        type: Schema.Types.ObjectId,
        ref: 'Staff'
    }],
    students :[{
        type: Schema.Types.ObjectId,
        ref: 'Student'
    }]
});

module.exports = mongoose.model('Course', CourseSchema);