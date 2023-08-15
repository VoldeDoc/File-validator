const mysql = require('mysql2');
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database:'validate'
})

conn.connect()
console.log('Databse connected');
module.exports = conn.promise()
