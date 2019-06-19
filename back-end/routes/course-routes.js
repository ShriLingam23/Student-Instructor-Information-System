const express = require('express');
const Router = express.Router();
const Controller = require('../controllers/course-controllers');

Router.get('/', function (req, res) {
    Controller.findAll().then((data) => {
        res.status(data.status).send({data: data.data});
    }).catch(err => {
        res.status(err.status).send({message: err.message});
    })
});

Router.get('/:id', function (req, res) {
    Controller.find(req.params.id).then((data) => {
        res.status(data.status).send({data: data.data});
    }).catch(err => {
        res.status(err.status).send({message: err.message});
    })
});

Router.post('/', function (req, res) {
    Controller.insert(req.body).then((data) => {
        res.status(data.status).send({message: data.message});
    }).catch(err => {
        res.status(err.status).send({message: err.message});
    })
});

module.exports = Router;
