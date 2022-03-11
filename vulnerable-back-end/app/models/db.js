const mysql = require('mysql2');
require('dotenv').config();

const mysqlConfig = {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: process.env.MYSQL_DATABASE
}
const connection =  mysql.createConnection(mysqlConfig);
connection.connect(function(err) {
    if (err) throw err
    console.log("Connected to MySQL db")
})
module.exports = connection