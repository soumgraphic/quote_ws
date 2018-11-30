'use strict';

var sql = require('../model/db');

//Author Constructor
var Author = function (author) {
    this.name = author.name;
};

Author.createAuthor = function createAuthor(newAuthor, result) {
    sql.query("INSERT INTO q_author(a_name) VALUES (?)",[newAuthor.name],function (err, res) {
        if (err){
            console.log("error: ",err);
            result(err,null);
        } else {
            console.log("Insertion effectuer avec succès, l'id de l'insertion est : ",res.insertId);
            result(null,res.insertId);
        }
    });
};

Author.getAuthorById = function (authorId,result){
  sql.query("SELECT * FROM q_author WHERE a_id = ?",authorId,function (err,res) {
      if (err){
          console.log("error: ", err);
          result(err,null);
      } else {
          result(null,res);
      }
  });
};

Author.getAllAuthors = function (result){
    sql.query("SELECT * FROM q_author",function (err,res) {
        if (err){
            console.log("error: ", err);
            result(err,null);
        } else {
            console.log(" All Authors: ", res);
            result(null,res);
        }
    });
};

Author.updateAuthorById = function(authorId,author,result){
  sql.query("UPDATE q_author SET a_name = ? WHERE a_id = ?",[author.name,authorId],function (err,res) {
      if (err){
          console.log("error: ", err);
          result(err,null);
      } else {
          console.log("Update author: ", res);
          result(null,res);
      }
  });
};

Author.removeAuthorById = function (authorId, result){
    sql.query("DELETE FROM q_author WHERE a_id = ?",authorId,function (err,res) {
        if (err){
            console.log("error: ", err);
            result(err,null);
        } else {
            result(null,res);
        }
    });
};

Author.searchAuthorByName = function (search,result){
    sql.query("SELECT * FROM q_author WHERE a_name LIKE ? ","%" + search + "%",function (err,res) {
        if (err){
            console.log("error: ", err);
            result(err,null);
        } else {
            result(null,res);
        }
    });
};

module.exports = Author;
