const express = require('express');
const data = require('./router')
const mongoose = require("mongoose");
const bodyParser = require("body-parser")

var db = mongoose.connect('mongodb://localhost:27017/navData');
// var db = mongoose.connect('mongodb://47.75.178.162:27017/navigation');

const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api', data)
app.listen(3000, () => {
    console.log('app listening on port 3000.')
})