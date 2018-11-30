'use strict';

var sql = require('../model/db');
var bcrypt = require('bcryptjs');
var saltRounds = 10;

//Users Constructor
var Users = function (users) {
    this.name = users.name;
    this.email = users.email;
    this.password = users.password;
};

Users.createUser = function createUser(newUser, result) {
    //INSERT INTO u_user(u_name, u_email, u_password) VALUES (?,?,?)
  bcrypt.hash(newUser.password,saltRounds,function (err, hash) {
      var insertValues = [newUser.name,newUser.email,hash];
      sql.query("INSERT INTO u_user(u_name, u_email, u_password) VALUES (?)",[insertValues],function (err, res) {
          if (err){
              console.log("error: ",err);
              result(err,null);
          } else {
              console.log("Insertion effectuer avec succès, l'id de l'insertion est : ",res.insertId);
              result(null,res.insertId);
          }
      });
  });
};

Users.getUserById = function (userId, result){
    sql.query("SELECT * FROM u_user WHERE u_id = ?",userId, function (err,res) {
        if (err){
            console.log("error: ",err);
            result(err,null);
        } else {
            result(null,res);
        }
    });
};

Users.getUserByEmail = function (userEmail, result){
    sql.query("SELECT * FROM u_user WHERE u_email = ? LIMIT 1",userEmail, function (err,res) {
        if (err){
            console.log("error: ",err);
            result(err,null);
        } else {
            result(null,res);
        }
    });
};

Users.getAllUsers = function(result){
    sql.query("SELECT * FROM u_user", function (err,res) {
        if (err){
            console.log("error: ",err);
            result(err,null);
        } else {
            //console.log('users : ',res);
            result(null,res);
        }
    });
};

Users.authentification = function(user,result){
    sql.query("SELECT * FROM u_user WHERE u_email = ?",[user.email],function (err,results){
        if (err){
            console.log("error: ",err);
            results(err,null);
        } else {
            let userDatabase = results[0];
            bcrypt.compare(user.password,userDatabase.u_password,function (err,res) {
                if (err){
                    console.log("error: ",err);
                    result(err,null);
                } else {
                    result(null,res);
                }
            });
        }
    });
};

Users.searchUserByName = function (search,result){
    sql.query("SELECT * FROM u_user WHERE u_name LIKE ? ","%" + search + "%",function (err,res) {
        if (err){
            console.log("error: ", err);
            result(err,null);
        } else {
            result(null,res);
        }
    });
};

module.exports = Users;
