const express = require('express');
const router = express.Router();

const Student = require('../../models/student-model');


//Create a new Student
router.route('/add').post(function(req,res){
    let student = new Student(req.body);
    console.log(student)

    student.save()
        .then(result =>{
            res.status(200).json({'DB':"Course Successfully Added"})
        })
        .catch(err=>{
            res.status(400).json({'DB':"Insertion Unsuccessful"})
        })
})

//Read Course details
router.route('/').get(function(req,res){
    Student.find().populate('courses').exec()
        .then(
            (students)=>{
                res.status(200).json(students);
            }
        )
        .catch(
            (err)=>{
                res.status(400).json({'message':"Couldn't Retrive"});
            }
        )
})

//Get Course details for Edit
router.route('/edit/:id').get(function (req, res) {

    Student.findOne({_id:req.params.id}).populate('courses').exec()
        .then(
            (student)=>{
                res.status(200).json(student);
                console.log(student)
            }
        )
        .catch(
            (err)=>{
                res.status(400).json({'message':"Couldn't Retrive"});
            }
        )
    
});

//Update Student details
router.route('/update/:id').post(function (req, res) {

    Student.update({_id:req.params.id},req.body)
        .then(
            ()=>res.status(200).json({'Student':"Successfully Updated"})
        )
        .catch(
            (err)=>res.status(400).send("Unable to Update Student")
        )
});

//Delete Course
router.route('/delete/:id').get(function(req,res){

    Student.remove({_id:req.params.id})
        .then(
            ()=>res.status(200).json('Successfully removed')
        )
        .catch(
            (err)=>res.status(400).json(err)
        )
})

module.exports=router;