const express = require('express');
const path = require('path');

const mongoClient = require('mongodb').MongoClient;

const mongoURL = "mongodb://localhost:27017/"
global.db = ''
mongoClient.connect(mongoURL, {useUnifiedTopology: true}, (err, res) => {
    if (err) {console.log("Database error"); return}
    db = res.db("company");
    console.log("Database listening...")
})

const rPostUsers = require(path.join(__dirname, 'routes', 'users', 'post-users.js' ));

const app = express();

app.post('/users', rPostUsers);

app.listen(80, err => {
    if(err) {
        console.log("Server error"); return
    }
    console.log("Server listening...")
})