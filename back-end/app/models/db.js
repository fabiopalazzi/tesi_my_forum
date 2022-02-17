const mysql = require('mysql2');

const mysqlConfig = {
    host: "mysql_server",
    user: "user",
    password: "123456",
    database: "forum"
}
const connection =  mysql.createConnection(mysqlConfig);
connection.connect(function(err) {
    if (err) throw err
    console.log("Connected to MySQL db")
})
module.exports = connection