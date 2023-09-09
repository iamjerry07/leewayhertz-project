const express = require('express')
const mongoose =require('mongoose')
const route = require('./route.js');
const bodyParser= require("body-parser")
require('dotenv').config()

const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let string = process.env.MONGODB_CONNECTION_STRING

mongoose.connect(string, {
    useNewUrlParser: true
})
    .then(() => console.log("MongoDb is connected"))
    .catch(err => console.log(err));
    
app.use('/', route);

app.listen(port, () => console.log(`Backend app listening on port ${port}!`))