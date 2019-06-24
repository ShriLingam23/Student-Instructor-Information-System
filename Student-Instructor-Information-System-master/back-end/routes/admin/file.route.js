const express = require('express');
const router = express.Router();

const File = require('../../models/file-model');
const fs = require('fs');

const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, res, cb) {
      cb(null, './public/files/')
  }
});

const upload = multer({ storage: storage });

//Create a new Course
router.post("/uploadfile", upload.single("file"), function(req, res, next){
    var new_file = new File;
    console.log(req.file)

    new_file.file.data = fs.readFileSync(req.file.path);
    new_file.file.contentType = req.file.mimetype;
    console.log(new_file.file.contentType)
    // new_file.file.contentType = 'image/png';

    console.log(req.file.path,new_file.file.data)

    //Saving the file
    new_file.save();
    console.log(new_file)

    res.send({ id:new_file._id });
})

//Read Course details
router.route('/uploadfile').get(function(req,res){
    
    File.find().exec((err, result) => {
   
        if (err) 
            return console.log(err)

        console.log(result)

        res.contentType('json');
        res.send(result)
   
    })
})


//Delete Course
router.delete("/uploadfile/:id", function(req, res, next) {
    console.log(req.params.id)
    File.findByIdAndRemove(req.params.id,(err,files)=>{
      if(!err){
        res.send({"message":"Deleted"})
      }
    })
  });

module.exports=router;