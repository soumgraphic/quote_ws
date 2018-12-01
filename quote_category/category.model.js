'use strict';

var sql = require('../model/db');

//Category Constructor
var Category = function (category) {
    this.name = category.name;
};

Category.createCategory = function createCategory(newCategory, result) {
    sql.query("INSERT INTO q_category(c_name,c_create_date,c_last_update) VALUES (?,Now(),Now())",[newCategory.name],function (err, res) {
        if (err){
            console.log("error: ",err);
            result(err,null);
        } else {
            console.log("Insertion effectuer avec succès, l'id de l'insertion est : ",res.insertId);
            result(null,res.insertId);
        }
    });
};

Category.getCategorieById = function (catId,result){
  sql.query("SELECT * FROM q_category WHERE c_id = ?",catId,function (err,res) {
      if (err){
          console.log("error: ", err);
          result(err,null);
      } else {
          result(null,res);
      }
  });
};

Category.getAllCategories = function (result){
    sql.query("SELECT * FROM q_category",function (err,res) {
        if (err){
            console.log("error: ", err);
            result(err,null);
        } else {
            console.log(" All category: ", res);
            result(null,res);
        }
    });
};

Category.updateCategoryById = function(catId,category,result){
  sql.query("UPDATE q_category SET c_name = ?, c_last_update = Now() WHERE c_id = ?",[category.name,catId],function (err,res) {
      if (err){
          console.log("error: ", err);
          result(err,null);
      } else {
          console.log("Update category: ", res);
          result(null,res);
      }
  });
};

Category.removeCategorieById = function (catId, result){
    sql.query("DELETE FROM q_category WHERE c_id = ?",catId,function (err,res) {
        if (err){
            console.log("error: ", err);
            result(err,null);
        } else {
            result(null,res);
        }
    });
};

Category.searchCategorieByName = function (search,result){
    sql.query("SELECT * FROM q_category WHERE c_name LIKE ? LIMIT 1","%" + search + "%",function (err,res) {
        if (err){
            console.log("error: ", err);
            result(err,null);
        } else {
            result(null,res);

            //Affichage des données la console
            res.forEach( (res) => {
                console.log(`${res.c_id} is ${res.c_name}`);
            });
        }
    });
};

Category.searchCategorieByNameAndCreateIfNotExist = function (search,result){
    sql.query("SELECT * FROM q_category WHERE c_name LIKE ? ","%" + search + "%",function (err,res) {
        if (err){
            console.log("error: ", err);
            result(err,null);
        } else {
            if (res.length > 0){
                result(null,res[0]);
            } else {
                sql.query("INSERT INTO q_category(c_name) VALUES (?)",search,function (err, res) {
                    if (err){
                        console.log("error: ",err);
                        result(err,null);
                    } else {
                        console.log("Insertion effectuer avec succès, l'id de l'insertion est : ",res.insertId);
                        let resFormatted = {
                            c_id:res.insertId
                        };
                        result(null,resFormatted);
                    }
                });
            }
        }
    });
};

module.exports = Category;
