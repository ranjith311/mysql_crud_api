const mysql = require("mysql2");
const db = mysql.createConnection({
    host:"localhost",
    user:"mysql_admin",
    password:"mysql_admin24",
    database:"acme"
})  


module.exports = db