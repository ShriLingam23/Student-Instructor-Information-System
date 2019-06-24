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


router.post('/register', (req, res, next) => {
    const newStudent = new Student(req.body);

    Student.findOne({email: req.body.email})
        .then(user => {

            if (!user) {
                bcrypt.hash(newStudent.password, 10, (err, hash) => {
                    newStudent.password = hash;

                    newStudent.save().then(student => {
                        res.status(200).json({data: student});
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

router.post('/profile', (req, res, next) =>{
    const email = req.body.email;
    console.log(email);
    Student.findOne({'email': email})
        .then(student => {
            //console.log(student);
            res.json(student);
        })
        .catch(err => {
            console.log(err);
        })
});

router.put('/forgot-password/:id', (req, res, next) => {
    const newStudent = {
        password: req.body.password
    };

    bcrypt.hash(newStudent.password, 10, (err, hash) => {
        newStudent.password = hash;

        Student.updateOne({_id: req.params.id}, newStudent)
            .then(student => {

                //Dependencies needed for Email service
                const nodemailer = require('nodemailer');
                const ejs = require("ejs");

                //Creating transport instance
                var transport = {
                    host: 'smtp.gmail.com',
                    auth: {
                        user: 'findmytrip2017@gmail.com',
                        pass: 'findmytrip@2017'
                    },
                    tls: {
                        rejectUnauthorized: false
                    }
                };

                //Creating a Nodemailer Transport instance
                var transporter = nodemailer.createTransport(transport);

                //Verifying the Nodemailer Transport instance
                transporter.verify((error, success) => {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Server is ready to take messages');
                    }
                });

                //Manipulating data to ejs mail template
                ejs.renderFile(__dirname + "/../template/Reset.ejs", {
                    email: req.body.email,
                    password: req.body.password
                }, function (err, data) {
                    if (err) {
                        console.log('error up');
                        //console.log(req.body.email);
                        //console.log(req.body.password);
                        //console.log(err);
                    } else {
                        var mainOptions = {
                            from: '"FindMyTrip" findmytrip2017@gmail.com',
                            to: req.body.email,
                            subject: 'Password Reset',
                            html: data
                        };
                        //console.log("html data ======================>", mainOptions.html);

                        transporter.sendMail(mainOptions, function (err, info) {
                            if (err) {
                                res.status(200).json({'DB': "Successfully Added", "MAIL": "Not Sent"})
                            } else {
                                console.log('email. sent');
                                res.status(200).json({'DB': "Successfully Added", "MAIL": "Successfully Sent"})
                            }
                        });
                    }
                });

                //console.log('reset password');
                //res.json(student);
            })
            .catch(err => {
                console.log('error down');
                console.log(err);
            })
    })
})


module.exports = router;