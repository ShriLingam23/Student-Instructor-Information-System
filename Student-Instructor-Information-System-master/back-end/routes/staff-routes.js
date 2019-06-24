const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Staff = require('../models/staff-model');

router.post('/login', (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    Staff.findOne({email: email})
        .then(staff => {
            if (staff) {
                bcrypt.compare(password, staff.password)
                    .then(result => {
                        res.status(200).json({data:staff ,result:result});
                    }).catch(err => {
                    console.log(err);
                })
            }
        })
        .catch(err => {
            console.log(err);
        });

});


//Create a new staff
router.route('/add').post(function (req, res) {
    let newStaff = new Staff(req.body);

    Staff.findOne({email: req.body.email})
        .then(user => {

            if (!user) {
                bcrypt.hash(newStaff.password, 10, (err, hash) => {
                    newStaff.password = hash;

                    newStaff.save()
                        .then(result => {

                            //Dependiencies needed for Email service
                            const nodemailer = require('nodemailer');
                            const ejs = require("ejs");
                            const creds = require('../configs/credential-configs');

                            //Creating transport instance
                            var transport = {
                                host: 'smtp.gmail.com',
                                auth: {
                                    user: creds.USER,
                                    pass: creds.PASS
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
                            ejs.renderFile(__dirname + "/../template/Hello.ejs", {
                                name: req.body.fullName,
                                email: req.body.email,
                                password: req.body.password
                            }, function (err, data) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    var mainOptions = {
                                        from: '"FindMyTrip" findmytrip2017@gmail.com',
                                        to: req.body.email,
                                        subject: 'Account Activated',
                                        html: data
                                    };
                                    // console.log("html data ======================>", mainOptions.html);

                                    transporter.sendMail(mainOptions, function (err, info) {
                                        if (err) {
                                            res.status(200).json({'DB': "Successfully Added", "MAIL": "Not Sent"})
                                        } else {
                                            res.status(200).json({
                                                'DB': "Successfully Added",
                                                "MAIL": "Successfully Sent"
                                            })
                                        }
                                    });
                                }
                            });
                        })
                        .catch(err => {
                            res.status(400).send("unable to save to database");
                        })
                })
            } else {
                res.status(400).json('staff already exist');
            }
        })
        .catch(err => {
            console.log(err);
        })
});

//Read staff details
router.route('/').get(function (req, res) {
    Staff.find(function (err, staffs) {
        if (err) {
            console.log(err);
        } else {
            res.status(200).json(staffs);
        }
    })
});

//Get Staff details for Edit
router.route('/edit/:id').get(function (req, res) {

    Staff.findById(req.params.id, function (err, staff) {
        if (err) {
            console.log(err);
        } else {
            res.status(200).json(staff);
        }
    });
});

//Update Staff details
router.route('/update/:id').post(function (req, res) {

    Staff.findById(req.params.id, function (err, staff) {

        if (err) {
            console.log(err);
        } else {
            staff.fullName = req.body.fullName;
            staff.email = req.body.email;
            staff.profession = req.body.profession;
            staff.contactNum = req.body.contactNum;
            staff.location = req.body.location;
            staff.response = req.body.response;

            staff.save()
                .then(result => {
                    res.status(200).json({'Staff': "Successfully Updated"})
                })
                .catch(err => {
                    res.status(400).send("Unable to Update Staff");
                })
        }
    });
});

//Delete Staff
router.route('/delete/:id').get(function (req, res) {

    Staff.findByIdAndDelete(req.params.id, function (err, staff) {

        if (err)
            res.status(400).json(err);

        else
            res.status(200).json('Successfully removed' + staff.fullName)
    })
});

router.get('/:id/courses', (req, res, next) => {
    Staff.findOne({_id: req.params.id}).select('courses').populate('courses').exec().then(data => {
        res.status(200).send({data: data});
    }).catch(err => {
        res.status(500).send({message: err.message});
    })
});

router.put('/:id', (req, res) => {

    Staff.findOne({_id: req.params.id}).then((data) => {
        let courses = data.courses;

        if (!courses.includes(req.body.courseId))
            courses.push(req.body.courseId);

        Staff.updateOne({_id: req.params.id}, {courses: courses}).then(() => {
            res.status(200).send({message: 'Staff-Course Updated Successfully'});
        }).catch(err => {
            res.status(500).send({message: err.message});
        })
    });
});

module.exports = router;