const express = require('express');
const router = express.Router();
const Student = require('../models/student-model');
const bcrypt = require('bcrypt');


router.post('/login', (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    Student.findOne({email: email})
        .then(student => {
            if (student) {
                bcrypt.compare(password, student.password)
                    .then(result => {
                        res.status(200).json({data: student, result: result});
                    }).catch(err => {
                    console.log(err);
                })
            }
        })
        .catch(err => {
            console.log(err);
        });

});


router.post('/', (req, res, next) => {
    const newStudent = new Student(req.body);

    Student.findOne({email: req.body.email})
        .then(user => {

            if (!user) {
                bcrypt.hash(newStudent.password, 10, (err, hash) => {
                    newStudent.password = hash;

                    newStudent.save().then(student => {
                        res.status(200).json(student);
                        console.log('student added successfully');
                    })
                        .catch(err => {
                            console.log(err);
                            res.status(400).json({'registration': 'failed'});
                        });
                })
            } else {
                res.status(409).json('user already exist');
            }
        })
        .catch(err => {
            console.log(err);
        })

});


router.get('/:id', (req, res) => {
    Student.findOne({_id: req.params.id}).populate('assessments').exec().then((data) => {
            res.status(200).send({data: data});
        }).catch(err => {
            res.status(500).send({message: err.message});
        })
});

router.put('/:id', (req, res) => {
    Student.findOne({_id: req.params.id}).then((data) => {
        let assessments = data.assessments;

        if (!assessments.includes(req.body.assessment))
            assessments.push(req.body.assessment);

        Student.updateOne({_id: req.params.id}, {assessments: assessments}).then(() => {
            res.status(200).send({data: data});
        }).catch(err => {
            res.status(500).send({message: err.message});
        })
    })
});


module.exports = router;