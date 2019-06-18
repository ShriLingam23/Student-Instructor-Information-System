const express = require('express');
const Router = express.Router();
const multer = require('multer');
const fs = require('fs');
const Controller = require('../controllers/assignment-controllers');
const path = require('../server');
const fileConfigs = require('../configs/file-configs');

let storageMaterial = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/documents/materials')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
});

const uploadMaterial = multer({
    storage: storageMaterial,
    limits: {fileSize: fileConfigs.fileSize}
}).single('file');


Router.post('/upload-file', function (req, res) {
    uploadMaterial(req, res, function (err) {
        if (err) {
            res.send({status:400,message: err.message});
            return
        }
        if (req.file) {
            res.json({
                file_url: `documents/materials/${req.file.filename}`
            });
        } else
            res.send({status:400,message: "No Files to Upload."});
    });
});

Router.post('/delete-file', (req) => {
    let file = req.body.file_url;

    fs.unlink(path + "/public/" + file, function (err) {
        if (err) {
            console.log("File Not Found");
        } else {
            console.log("deleted");
        }
    });
});

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

Router.put('/:id', function (req, res) {
    Controller.update(req.params.id, req.body).then((data) => {
        res.status(data.status).send({message: data.message});
    }).catch(err => {
        res.status(err.status).send({message: err.message});
    })
});

Router.delete('/:id', function (req, res) {
    Controller.delete(req.params.id).then((data) => {
        res.status(data.status).send({message: data.message});
    }).catch(err => {
        res.status(err.status).send({message: err.message});
    })
});

module.exports = Router;
