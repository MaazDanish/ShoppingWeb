const mysql = require('mysql2');

const pool = mysql.createPool( {
    host:'localhost',
    user:'root',
    database:'FirstProject',
    password:'maazdanish'
})
module.exports = pool.promise();