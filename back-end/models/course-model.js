const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CourseSchema = new Schema({
    name: {
        type: String
    },
    code: {
        type: String,
        unique: true
    }
});

module.exports = mongoose.model('Course', CourseSchema);