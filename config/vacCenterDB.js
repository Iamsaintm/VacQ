const mysql = require('mysql');

var connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '!Saint1998',
    database: 'VacCenter'
});

module.exports = connection;