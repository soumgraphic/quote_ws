'use strict';

var Author = require('./author.model');
var constants = require('../config/constants');

exports.create_a_author = function (req, res) {
    var new_author = new Author(req.body);

    if (!new_author.name) {
        res.status(constants.HTTP_BAD_REQUEST).send({
            error: true,
            error_code: constants.EMPTY_FIELDS,
            message: 'Veuillez remplir le champ nom ',
        });
    } else {
        Author.createAuthor(new_author, function (err, author) {
            if (err) {
                res.send(err);
            } else {
                res.status(constants.HTTP_CREATED).json({
                    error: false,
                    error_code: constants.SUCCESSFULLY_COMPLETED,
                    message: 'Création de l\'auteur ' + new_author.name + ' effectuer avec succès ! ',
                    author
                });
            }
        });
    }

};

exports.get_a_author = function (req, res) {
    Author.getAuthorById(req.params.authorId, function (err, author) {
        if (err) {
            res.send(err);
        } else if (author.length > 0) {
            res.json({
                error: false,
                error_code: constants.SUCCESSFULLY_COMPLETED,
                message: 'Auteur retrouver avec succès ',
                author
            });
        } else {
            res.status(constants.HTTP_NOT_FOUND).json({
                error: false,
                error_code: constants.NO_VALUE_FOUND,
                message: 'Auteur non trouvé dans la Base de données ',
                author
            });
        }
    });
};

exports.get_all_author = function (req, res) {

    //Si le mot search est présente dans l'url et qu'il est renseigné
    let search = req.query.search;
    if (search){
        Author.searchAuthorByName(search, function (err, author) {
            if (err) {
                res.send(err);
            } else if (author.length > 0) {
                res.json({
                    error: false,
                    error_code: constants.SUCCESSFULLY_COMPLETED,
                    message: 'Auteur retrouver avec succès ',
                    author
                });
            } else {
                res.status(constants.HTTP_NOT_FOUND).json({
                    error: false,
                    error_code: constants.NO_VALUE_FOUND,
                    message: 'Auteur non trouvé dans la Base de données ',
                    author
                });
            }
        });
    } else {
        Author.getAllAuthors(function (err, author) {
            if (err) {
                res.send(err);
            } else if (author.length > 0) {
                res.json({
                    error: false,
                    error_code: constants.SUCCESSFULLY_COMPLETED,
                    message: 'Les auteurs ont été retrouver avec succès ',
                    author
                });
            } else {
                res.status(constants.HTTP_NOT_FOUND).json({
                    error: false,
                    error_code: constants.NO_VALUE_FOUND,
                    message: 'Aucun auteur trouvé dans la Base de données ',
                    author
                });
            }
        });
    }
};

exports.update_a_author = function (req, res) {

    var update_author = new Author(req.body);
    //Réflechir à comment faire trim sur name
    if (!update_author.name) {
        res.status(constants.HTTP_BAD_REQUEST).send({
            error: true,
            error_code: constants.EMPTY_FIELDS,
            message: 'Veuillez remplir le champ nom de l\'auteur '
        });
    } else {
        Author.getAuthorById(req.params.authorId, function (err, get_author) { // On vérifie d'abord si l'auteur existe
            if (err) {
                res.send(err);
            } else if (get_author.length > 0) { //Si l'auteur existe dans la base
                Author.updateAuthorById(req.params.authorId, update_author, function (err, author) {
                    if (err) {
                        res.send(err);
                    } else {
                        res.json({
                            error: false,
                            error_code: constants.SUCCESSFULLY_COMPLETED,
                            message: 'L\'auteur ' + get_author[0].a_name + ' a bien été renommer en ' + update_author.name
                        });
                    }
                });

            } else {
                res.status(constants.HTTP_NOT_FOUND).json({
                    error: false,
                    error_code: constants.NO_VALUE_FOUND,
                    message: 'Cet auteur n\'existe pas dans la Base de données, impossible de la modifier ',
                });
            }
        });
    }

};

exports.delete_a_author = function (req, res) {
    Author.getAuthorById(req.params.authorId, function (err, getAuthor) {
        if (err) {
            res.send(err);
        } else if (getAuthor.length > 0) {
            Author.removeAuthorById(req.params.authorId, function (err,author) {
                if (err) {
                    res.send(err);
                } else {
                    res.json({
                        error: false,
                        error_code: constants.SUCCESSFULLY_COMPLETED,
                        message: 'L\'auteur a été supprimé avec succès !'
                    });
                }
            });
        } else {
            res.status(constants.HTTP_NOT_FOUND).json({
                error: false,
                error_code: constants.NO_VALUE_FOUND,
                message: 'Ce auteur n\'existe pas dans la Base de données, impossible de la supprimer '
            });
        }
    });
};