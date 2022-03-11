const express = require('express')
const mysql = require('mysql2');
const router = require('./routes/routes');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config()

const app = express()

app.use(cors())


app.use(express.json())
app.use(express.urlencoded())

app.use(router)

// respond with "hello world" when a GET request is made to the homepage

app.get('/', function (req, res) {
  res.send('Server is UP')
})

app.listen(process.env.BACKEND_PORT_IN)

console.log("listening on port " + process.env.BACKEND_PORT_IN)
