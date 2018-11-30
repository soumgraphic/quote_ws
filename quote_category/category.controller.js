'use strict';

var Category = require('./category.model');
var constants = require('../config/constants');
const util = require('util');

exports.create_a_category = function (req, res) {
    console.log(`post/${util.inspect(req.body,false,null)}`);
    console.log("Req body création catégorie " + req.body);
    let new_category = new Category(req.body);

    if (!new_category.name) {
        res.status(constants.HTTP_BAD_REQUEST).send({
            error: true,
            error_code: constants.EMPTY_FIELDS,
            message: 'Veuillez remplir le champ nom ',
        });
    } else {
        Category.createCategory(new_category, function (err, category) {
            if (err) {
                res.send(err);
            } else {
                res.status(constants.HTTP_CREATED).json({
                    error: false,
                    error_code: constants.SUCCESSFULLY_COMPLETED,
                    message: 'Création de la catégorie ' + new_category.name + ' effectuer avec succès ! ',
                    category
                });
            }
        });
    }

};

exports.get_a_category = function (req, res) {
    Category.getCategorieById(req.params.catId, function (err, category) {
        if (err) {
            res.send(err);
        } else if (category.length > 0) {
            res.json({
                error: false,
                error_code: constants.SUCCESSFULLY_COMPLETED,
                message: 'Catégorie retrouver avec succès ',
                category
            });
        } else {
            res.status(constants.HTTP_NOT_FOUND).json({
                error: false,
                error_code: constants.NO_VALUE_FOUND,
                message: 'Catégorie non trouvé dans la Base de données ',
                category
            });
        }
    });
};

exports.get_all_category = function (req, res) {

    //Si le mot search est présente dans l'url et qu'il est renseigné
    let search = req.query.search;
    if (search){
        Category.searchCategorieByName(search, function (err, category) {
            if (err) {
                res.send(err);
            } else if (category.length > 0) {
                res.json({
                    error: false,
                    error_code: constants.SUCCESSFULLY_COMPLETED,
                    message: 'Catégorie retrouver avec succès ',
                    category
                });
            } else {
                res.status(constants.HTTP_NOT_FOUND).json({
                    error: false,
                    error_code: constants.NO_VALUE_FOUND,
                    message: 'Catégorie non trouvé dans la Base de données ',
                    category
                });
            }
        });
    } else {
        Category.getAllCategories(function (err, category) {
            if (err) {
                res.send(err);
            } else if (category.length > 0) {
                res.json({
                    error: false,
                    error_code: constants.SUCCESSFULLY_COMPLETED,
                    message: 'Les catégories ont été retrouver avec succès ',
                    category
                });
            } else {
                res.status(constants.HTTP_NOT_FOUND).json({
                    error: false,
                    error_code: constants.NO_VALUE_FOUND,
                    message: 'Aucune Catégorie trouvé dans la Base de données ',
                    category
                });
            }
        });
    }

};

exports.update_a_category = function (req, res) {

    var update_category = new Category(req.body);
    //Réflechir à comment faire trim sur name
    if (!update_category.name) {
        res.status(constants.HTTP_BAD_REQUEST).send({
            error: true,
            error_code: constants.EMPTY_FIELDS,
            message: 'Veuillez remplir le champ nom de la catégorie',
        });
    } else {
        Category.getCategorieById(req.params.catId, function (err, get_category) { // On vérifie d'abord si la catégorie existe
            if (err) {
                res.send(err);
            } else if (get_category.length > 0) { //Si la catégorie existe dans la base
                Category.updateCategoryById(req.params.catId, update_category, function (err, category) {
                    if (err) {
                        res.send(err);
                    } else {
                        res.json({
                            error: false,
                            error_code: constants.SUCCESSFULLY_COMPLETED,
                            message: 'La catégorie ' + get_category[0].c_name + ' a bien été renommer en ' + update_category.name
                        });
                    }
                });

            } else {
                res.status(constants.HTTP_NOT_FOUND).json({
                    error: false,
                    error_code: constants.NO_VALUE_FOUND,
                    message: 'Cette catégorie n\'existe pas dans la Base de données, impossible de la modifier ',
                });
            }
        });
    }

};

exports.delete_a_category = function (req, res) {
    Category.getCategorieById(req.params.catId, function (err, getCategory) {
        if (err) {
            res.send(err);
        } else if (getCategory.length > 0) {
            Category.removeCategorieById(req.params.catId, function (err, category) {
                if (err) {
                    res.send(err);
                } else {
                    res.json({
                        error: false,
                        error_code: constants.SUCCESSFULLY_COMPLETED,
                        message: 'La catégorie a été supprimée avec succès !'
                    });
                }
            });
        } else {
            res.status(constants.HTTP_NOT_FOUND).json({
                error: false,
                error_code: constants.NO_VALUE_FOUND,
                message: 'Cette catégorie n\'existe pas dans la Base de données, impossible de la supprimer '
            });
        }
    });
};