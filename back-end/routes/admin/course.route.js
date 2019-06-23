const express = require('express');
const router = express.Router();

const Course = require('../../models/course-model');


//Create a new Course
router.route('/add').post(function(req,res){
    let course = new Course(req.body);
    console.log(course)

    course.save()
        .then(result =>{
            res.status(200).json({'DB':"Course Successfully Added"})
        })
        .catch(err=>{
            res.status(400).json({'DB':"Insertion Unsuccessful"})
        })
});

//Read Course details
router.route('/').get(function(req,res){
    Course.find(function(err,courses){
        if(err){
            console.log(err);
        }
        else {
            res.status(200).json(courses);
        }
    })
})

//Get Course details for Edit
router.route('/edit/:id').get(function (req, res) {

    Course.findById(req.params.id,function(err, course){
    if(err){
      console.log(err);
    }
    else {
        res.status(200).json(course);
    }
  });
});

//Update Staff details
router.route('/update/:id').post(function (req, res) {

    Course.findById(req.params.id,function(err, course){

        if(err){
            console.log(err);
        }
        else {

            course.courseId=req.body.courseId;
            course.courseName=req.body.courseName;
            course.enrollment=req.body.enrollment;
            course.faculty=req.body.faculty;
            course.year=req.body.year;
            course.semester=req.body.semester;
            course.staffs=req.body.staffs;
            
            course.save()
                .then(result=>{
                    res.status(200).json({'Course':"Successfully Updated"})
                })
                .catch(err=>{
                    res.status(400).send("Unable to Update Course");
                })
            
        }
    });
});

//Delete Course
router.route('/delete/:id').get(function(req,res){

    Course.findByIdAndDelete(req.params.id,function(err,course){

        if(err) 
            res.status(400).json(err);

        else 
            res.status(200).json('Successfully removed'+course.courseName)
    })
})

module.exports=router;