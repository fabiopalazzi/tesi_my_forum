const express = require('express')
const mysql = require('mysql2');
const router = require('./routes/routes');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express()

app.use(cors())


app.use(express.json())
app.use(express.urlencoded())

app.use(router)

// respond with "hello world" when a GET request is made to the homepage

app.get('/', function (req, res) {
  res.send('hello world')
})
/*
app.get('/connect', function (req, res) {
  con =  mysql.createConnection(mysqlConfig);
  con.connect(function(err) {
    if (err) throw err;
    res.send('connected')
  });
})
app.get('/create-table', function (req, res) {
  con.connect(function(err) {
    if (err) throw err;
    const sql = `
    CREATE TABLE IF NOT EXISTS numbers (
      id INT AUTO_INCREMENT PRIMARY KEY,
      number INT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )  ENGINE=INNODB;
  `;
    con.query(sql, function (err, result) {
      if (err) throw err;
      res.send("numbers table created");
    });
  });
})

app.get('/insert', function (req, res) {
  const number = Math.round(Math.random() * 100)
  con.connect(function(err) {
    if (err) throw err;
    const sql = `INSERT INTO numbers (number) VALUES (${number})`
    con.query(sql, function (err, result) {
      if (err) throw err;
      res.send(`${number} inserted into table`)
    });
  })
})

app.get('/fetch', function (req, res) {
  con.connect(function(err) {
    if (err) throw err;
    const sql = `SELECT * FROM numbers`
    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      res.send(JSON.stringify(result))
    });
  });
})*/

app.listen(3000)

console.log("listening on port 3000")

