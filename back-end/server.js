const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dbConfigs = require('./configs/db-configs');
const PORT = 4000;

module.exports = directoryPath = __dirname;

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

mongoose.connect(dbConfigs.mongodbUrl, dbConfigs.options)
    .then(() => {
        console.log('Connected to the DB Successfully');
    })
    .catch(err => {
        console.error(err);
        process.exit(-1);
    });

app.use('/courses',require('./routes/course-routes'));
app.use('/assignments',require('./routes/assignment-routes'));

app.listen(PORT, function () {
    console.log("Server is running on Port: " + PORT);
});