const express = require('express')
const router = require('./routes/routes');
const cors = require('cors')
const rateLimit = require('express-rate-limit')
require('dotenv').config()

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

var app = express()
app.use(cors())
app.use(limiter)
app.use(express.json())
app.use(express.urlencoded())
app.use(router)
app.listen(process.env.BACKEND_PORT_IN)

console.log("listening on port " + process.env.BACKEND_PORT_IN)


