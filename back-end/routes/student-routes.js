const express = require('express');
const router = express.Router();
const User = require('../models/student-model');

//user login request
router.post('/login', (req, res, next) => {

    User.findOne({email: req.body.email})
        .then(user => {
            if (user) {
                if (req.body.password === user.password) {
                    res.json({
                        message: 'Login Successful',
                        status: 200,
                        data: user
                    });
                } else {
                    res.json({
                        message: 'Incorrect Email or Password.',
                        status: 404
                    });
                }
            } else {
                res.json({
                    message: 'User does not exist',
                    status: 404
                });
            }
        })
        .catch(next)

});


//add a new user to the db
router.post('/register', (req, res) => {
    const userData = {
        email: req.body.email,
        password: req.body.password,
        courses: req.body.courses,
        user_type: req.body.user_type

    };

    User.find({email: userData.email})
        .then(user => {
            if (!user === false) {
                let user = User(userData);
                user.save().then(() => {
                    res.json({
                        message: 'User Registered Successfully',
                        status: 200
                    });
                }).catch(next)

            } else {
                res.json({
                    message: 'User already exist',
                    status: 404
                });
            }
        })

});

//user login request
router.get('/:id/courses', (req, res) => {
    User.findOne({_id: req.params.id}).select('courses').populate('courses').exec().then(data => {
        res.status(200).send({data: data});
    }).catch(err => {
        res.status(500).send({message: err.message});
    })
});

router.put('/:id', (req, res) => {

    User.findOne({_id: req.params.id}).then((data) => {
        let courses = data.courses;

        if (!courses.includes(req.body.courseId))
            courses.push(req.body.courseId);

        User.updateOne({_id: req.params.id}, {courses: courses}).then(() => {
            res.status(200).send({message: 'Instructor-Course Updated Successfully'});
        }).catch(err => {
            res.status(500).send({message: err.message});
        })
    });
});

module.exports = router;