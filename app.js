//Basic Library Import
const express = require('express');
const router = require('./src/routes/api');
const app = new express();
const bodyParser = require('body-parser');
const path = require('path');

//Security Middleware Lib Import
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');

//Database Lib Import
const mongoose = require('mongoose')
const rateLimit = require("express-rate-limit");

//Security Middleware Implement
app.use(cors())
app.use(helmet())
app.use(mongoSanitize())
app.use(xss())
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

//Body Parser Implement
app.use(bodyParser.json())

//Request Rate Limit
const limiter = rateLimit({windowMs:10*60*1000,max:3000})
app.use(limiter)

//Mongo DB Database Connection
let URI="mongodb+srv://<username>:<password>@cluster0.nnt6lro.mongodb.net/todo?retryWrites=true&w=majority";
let OPTION={user:'monir',pass:'1234',autoIndex:true}
mongoose.connect(URI,OPTION,(error)=>{
    console.log("Connect Success")
    console.log(error)
})
app.use(express.static('client/build'));

//Routing Implement
app.use("/api/v1",router)

//Add React Front End Routing
app.use("*",(req,res)=>{
    res.status(404).json({status:"fail",data:"Not Found"})
})

module.exports=app;