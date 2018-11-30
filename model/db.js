'use strict';

var mysql = require('mysql');

//Local db connection
var connection = mysql.createConnection({
   host : 'localhost',
   user : 'root',
    password : '',
    database : 'ws_quote_db'
});

connection.connect(function (err) {
   if (err) throw err;
});

// Pour pouvoir utiliser la fonction connexion dans les autre fichiers js
module.exports = connection;