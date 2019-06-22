const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InstructorSchema = new Schema({
    fullName  :{
        type:String,
        required:true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required:true
    },
    profession:{
        type:String,
        required:true
    },
    contactNum:{
        type:String,
        required:true,
        minlength: 10,
        maxlength: 10
    },
    location:{
        type:String,
        required:true
    },
    response:{
        type:String,
        required:true
    },
    courses :[{
        type: Schema.Types.ObjectId,
        ref: 'Course'
    }]
});

module.exports = mongoose.model('Instructor', InstructorSchema);

