'use strict';

var sql = require('../model/db');

//QuoteTag Constructor
var QuoteTag = function (quotetag) {
    this.quote_id = quotetag.quote_id;
    this.tag_id   = quotetag.tag_id;
};

QuoteTag.createQuoteTag = function createTag(newQuoteTag, result) {
    sql.query("INSERT INTO q_quote_has_q_tag(q_quote_q_id, q_tag_t_id) VALUES (?,?)",[newQuoteTag.quote_id, newQuoteTag.tag_id],function (err, res) {
        if (err){
            console.log("error: ",err);
            result(err,null);
        } else {
            console.log("Insertion effectuer avec succès ");
            result(null,res.insertId);
        }
    });
};

// Récupérer tous les tags d'un quote
QuoteTag.getQuoteTagByQuoteId = function (quote_id,result){
  sql.query("SELECT * FROM q_quote_has_q_tag qt,q_tag t WHERE qt.q_tag_t_id = t.t_id AND q_quote_q_id = ?",
      quote_id,function (err,res) {
      if (err){
          console.log("error: ", err);
          result(err,null);
      } else {
          result(null,res);
      }
  });
};

// Récupérer tous les quotes d'un tag
QuoteTag.getQuoteTagByTagId = function (tagId,result){
    sql.query("SELECT * FROM q_quote_has_q_tag qt,q_quote q WHERE qt.q_quote_q_id = q.q_id AND q_tag_t_id = ? ",
        tagId,function (err,res) {
        if (err){
            console.log("error: ", err);
            result(err,null);
        } else {
            result(null,res);
        }
    });
};

//Update, Delete, GetAllTags à faire plutard

module.exports = QuoteTag;
