'use strict';

let sql = require('../model/db');

//Author Constructor
let Quote = function (quote) {
    this.text = quote.text;
    this.author_id = quote.author_id;
    this.category_id = quote.category_id;
    this.user_id = quote.user_id;
    this.category_name = quote.category_name;
    this.author_name = quote.author_name;
};

const setAuthor = function(author) {
    this.author = author;
}

//Fonction de Création d'un quote mysql

Quote.createQuote = function createQuote(newQuote, result) {
    //let quoteInsert = [newQuote.text,newQuote.author_id,newQuote.category_id,newQuote.user_id];
    sql.query("INSERT INTO q_quote(q_text, q_author_a_id, q_category_c_id, u_user_u_id,q_create_date,q_last_update) VALUES (?,?,?,?,Now(),Now())",
             [newQuote.text,newQuote.author_id,newQuote.category_id,newQuote.user_id],function (err, res) {
        if (err){
            console.log("error: ",err);
            result(err,null);
        } else {
            console.log("Insertion du quote effectuer avec succès, l'id de l'insertion est : ",res.insertId);
            result(null,res.insertId);
        }
    });
};

Quote.getQuoteById = function (quoteId,result){
    sql.query("SELECT * FROM q_quote WHERE q_id = ?",quoteId,function (err,res) {
        if (err){
            console.log("error: ", err);
            result(err,null);
        } else {
            result(null,res[0]);
        }
    });
};

Quote.getAllQuotes = function (result){
    sql.query("SELECT * FROM q_quote",function (err,res) {
        if (err){
            console.log("error: ", err);
            result(err,null);
        } else {
            console.log(" All Authors: ", res);
            result(null,res);
        }
    });
};

Quote.removeQuoteById = function (quoteId, result) {
    sql.query("DELETE FROM q_quote WHERE q_id = ?",quoteId,function (err,res) {
        if (err){
            console.log("error: ", err);
            result(err,null);
        } else {
            result(null,res);
        }
    });
};

/*

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

*/

module.exports = Quote;
