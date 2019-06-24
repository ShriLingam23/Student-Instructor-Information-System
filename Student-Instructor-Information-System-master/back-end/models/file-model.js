var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FileSchema = new Schema({
        file: { 
            data: Buffer, 
            contentType: String
        },
        dataType:{
            type:String
        }
    },
    {    timestamps: true
});

//So the collection name will be files, since we have used "File" as model name
module.exports = mongoose.model('File', FileSchema);