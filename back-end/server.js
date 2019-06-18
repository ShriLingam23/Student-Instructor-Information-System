const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dbConfigs = require('./configs/db-configs');
const PORT = 4000;

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(dbConfigs.mongodbUrl, {useNewUrlParser: true})
    .then(() => {
        console.log('Connected to the DB Successfully');
    })
    .catch(err => {
        console.error(err);
        process.exit(-1);
    });

app.listen(PORT, function () {
    console.log("Server is running on Port: " + PORT);
});