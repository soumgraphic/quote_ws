'use strict';

var mysql = require('mysql');
let DB_CONFIG = require('../config/db.config');

//Local db connection
/*
var connection = mysql.createConnection({
   host : DB_CONFIG.LOCAL_MYSQL_HOST,
   user : DB_CONFIG.LOCAL_MYSQL_USER,
   password : DB_CONFIG.LOCAL_MYSQL_USER,
   database : DB_CONFIG.LOCAL_MYSQL_PASSWORD
});
*/

// Il verifie d'abord si la base de donnée est sur un env il prend
// les infos de l'environnement sinon il prend les infos en local
var connection = mysql.createConnection({
    host     : process.env.MYSQL_ADDON_HOST     || DB_CONFIG.LOCAL_MYSQL_HOST,
    database : process.env.MYSQL_ADDON_DB       || DB_CONFIG.LOCAL_MYSQL_DB,
    user     : process.env.MYSQL_ADDON_USER     || DB_CONFIG.LOCAL_MYSQL_USER,
    password : process.env.MYSQL_ADDON_PASSWORD || DB_CONFIG.LOCAL_MYSQL_PASSWORD
});

connection.connect(function (err) {
   if (err) throw err;
});

// Pour pouvoir utiliser la fonction connexion dans les autre fichiers js
module.exports = connection;