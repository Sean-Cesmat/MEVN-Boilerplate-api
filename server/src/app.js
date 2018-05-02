const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
var Post = require("../models/posts")

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

mongoose.connect('mongodb://localhost:27017/posts')
var db = mongoose.connection
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function(callback){
  console.log("Connection Secceeded")
})



app.use('/posts', require('../routes/posts'));
app.use('/auth', require('../routes/auth'));

app.listen(process.env.PORT || 8081)
