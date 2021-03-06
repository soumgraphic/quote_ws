'use strict';

var sql = require('../model/db');

//Tag Constructor
var Tag = function (tag) {
    this.name = tag.name;
};

Tag.createTag = function createTag(newTag, result) {
    sql.query("INSERT INTO q_tag(t_name,t_create_date,t_last_update) VALUES (?,Now(),Now())",[newTag.name],function (err, res) {
        if (err){
            console.log("error: ",err);
            result(err,null);
        } else {
            console.log("Insertion effectuer avec succès, l'id de l'insertion est : ",res.insertId);
            result(null,res.insertId);
        }
    });
};

Tag.getTagById = function (tagId,result){
  sql.query("SELECT * FROM q_tag WHERE t_id = ?",tagId,function (err,res) {
      if (err){
          console.log("error: ", err);
          result(err,null);
      } else {
          result(null,res[0]);
      }
  });
};

Tag.getAllTags = function (result){
    sql.query("SELECT * FROM q_tag",function (err,res) {
        if (err){
            console.log("error: ", err);
            result(err,null);
        } else {
            console.log(" All tag: ", res);
            result(null,res);
        }
    });
};

Tag.updateTagById = function(tagId,tag,result){
  sql.query("UPDATE q_tag SET t_name = ?, t_last_update = Now() WHERE t_id = ?",[tag.name,tagId],function (err,res) {
      if (err){
          console.log("error: ", err);
          result(err,null);
      } else {
          console.log("Update tag: ", res);
          result(null,res);
      }
  });
};

Tag.removeTagById = function (tagId, result){
    sql.query("DELETE FROM q_tag WHERE t_id = ?",tagId,function (err,res) {
        if (err){
            console.log("error: ", err);
            result(err,null);
        } else {
            result(null,res);
        }
    });
};

Tag.searchTagByName = function (search,result){
    sql.query("SELECT * FROM q_tag WHERE t_name LIKE ? ","%" + search + "%",function (err,res) {
        if (err){
            console.log("error: ", err);
            result(err,null);
        } else {
            result(null,res);
        }
    });
};

Tag.searchTagByNameAndCreateIfNotExist = function (search,result){
    sql.query("SELECT * FROM q_tag WHERE t_name LIKE ? ","%" + search + "%",function (err,res) {
        if (err){
            console.log("error: ", err);
            result(err,null);
        } else {
            if (res.length > 0){
                result(null,res[0]);
            } else {
                sql.query("INSERT INTO q_tag(t_name) VALUES (?)",search,function (err, res) {
                    if (err){
                        console.log("error: ",err);
                        result(err,null);
                    } else {
                        console.log("Insertion effectuer avec succès, l'id de l'insertion est : ",res.insertId);
                        let resFormatted = {
                            t_id:res.insertId
                        };
                        result(null,resFormatted);
                    }
                });
            }
        }
    });
};

module.exports = Tag;
