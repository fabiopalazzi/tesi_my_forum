const express = require('express')
const mysql = require('mysql2');
const router = require('./routes/routes');
const bodyParser = require('body-parser');
const cors = require('cors')
const helmet = require('helmet')
require('dotenv').config()

const app = express()

//Prevent prototype pollution
Object.freeze(Object)
Object.freeze(Object.prototype)
/*Prevent this example of attack
let a = {c:15}
console.log(a.toString())
let b = {c:20}
b.__proto__.toString = ()=>{console.log('hacked')}
b.toString()
a.toString()*/

//helmet package prevent XSS scripting
app.use(helmet.xssFilter(),helmet.contentSecurityPolicy())

app.use(cors())

app.use(express.json())
app.use(express.urlencoded())

app.use(router)

// respond with "hello world" when a GET request is made to the homepage

app.get('/', function (req, res) {
  res.send('hello world')
})

app.listen(process.env.BACKEND_PORT_IN)

console.log("listening on port " + process.env.BACKEND_PORT_IN)

