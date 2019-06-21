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
app.use('/instructors',require('./routes/instructor-routes'));
app.use('/students',require('./routes/student-routes'));
app.use('/assessments',require('./routes/assessment-routes'));
app.use('/submissions',require('./routes/submission-routes'));
app.use('/notifications',require('./routes/course-notification-routes'));

app.listen(PORT, function () {
    console.log("Server is running on Port: " + PORT);
});