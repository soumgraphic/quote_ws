'use strict';

var Users = require('./users.model');
var jwt = require('jsonwebtoken');
var constants = require('../config/constants');

exports.create_a_user = function (req, res) {
    var new_user = new Users(req.body);

    if (!new_user.name || !new_user.email || !new_user.password) {
        res.status(constants.HTTP_BAD_REQUEST).send({
            error: true,
            error_code: constants.EMPTY_FIELDS,
            message: 'Veuillez remplir les champs email, nom et password',
        });
    } else {
        Users.getUserByEmail(new_user.email, function (err, user) {
            if (err) {
                res.send(err);
            } else if (user.length > 0) { // email utilisateur retrouver dans la base
                res.json({
                    error: true,
                    error_code: constants.EMAIL_ALREADY_EXISTS,
                    message: 'L\'email  ' + new_user.email + ' existe déjà ',
                });
            } else { // L'email n'existe pas dans la Base
                Users.createUser(new_user, function (err, user) {
                    if (err) {
                        res.send(err);
                    } else {
                        //Génération du token pour sécuriser l'api.
                        var token = jwt.sign(user, global.config.mysecret);
                        res.status(constants.HTTP_CREATED).json({
                            error: false,
                            error_code: constants.SUCCESSFULLY_COMPLETED,
                            message: 'Création de l\'utilisateur ' + new_user.name.toUpperCase() + ' effectuer avec succès ! ',
                            user,
                            token
                        });
                    }
                });
            }
        });
    }
};

exports.user_authentication = function (req, res){
    var userAuth = new Users(req.body);
    if (!userAuth.email || !userAuth.password){
        res.status(constants.HTTP_BAD_REQUEST).send({
            error: true,
            error_code: constants.EMPTY_FIELDS,
            message: 'Veuillez remplir les champs email et password',
        });
    } else {
        Users.getUserByEmail(userAuth.email, function (err, user) {
            if (err) {
                res.send(err);
            } else if (user.length > 0) { // utilisateur retrouver dans la base
                Users.authentification(userAuth, function (err, user) { // On fait l'authentification
                    if (err) {
                        res.send(err);
                    } else if (user === true) { // Si user est égale à true, sa veut dire que le user est authentifier
                        res.json({
                            error: false,
                            error_code: constants.SUCCESSFULLY_AUTHENTIFIED,
                            message: 'Utilisateur authentifier avec succès ',
                            user
                        });
                    }else {
                        res.json({
                            error: true,
                            error_code: constants.INCORRECT_PASSWORD,
                            message: 'Mot de passe incorrect :) ',
                            user
                        });
                    }
                });
            } else {
                res.status(constants.HTTP_NOT_FOUND).json({
                    error: true,
                    error_code: constants.USER_NOT_FOUND,
                    message: 'Cet utilisateur n\'existe pas dans la Base de données ',
                    user
                });
            }
        });
    }
};

exports.get_a_user = function (req, res) {
    var userId = req.params.userId;
    Users.getUserById(userId, function (err, user) {
        if (err) {
            res.send(err);
        } else if (user.length > 0) {
            res.json({
                error: false,
                error_code: constants.SUCCESSFULLY_COMPLETED,
                message: 'Utilisateur retrouver avec succès ',
                user
            });
        } else {
            res.status(constants.HTTP_NOT_FOUND).json({
                error: false,
                error_code: constants.NO_VALUE_FOUND,
                message: 'Utilisateur non trouvé dans la Base de données ',
                user
            });
        }
    });
};

exports.get_all_user = function (req, res) {
    //Si le mot search est présente dans l'url et qu'il est renseigné
    let search = req.query.search;
    if (search){
        Users.searchUserByName(search, function (err, user) {
            if (err) {
                res.send(err);
            } else if (user.length > 0) {
                res.json({
                    error: false,
                    error_code: constants.SUCCESSFULLY_COMPLETED,
                    message: 'Utilisateur retrouver avec succès ',
                    user
                });
            } else {
                res.status(constants.HTTP_NOT_FOUND).json({
                    error: false,
                    error_code: constants.NO_VALUE_FOUND,
                    message: 'Utilisateur non trouvé dans la Base de données ',
                    user
                });
            }
        });
    } else {
        Users.getAllUsers(function (err, user) {
            if (err) {
                res.send(err);
            } else if (user.length > 0) {
                res.json({
                    error: false,
                    error_code: constants.SUCCESSFULLY_COMPLETED,
                    message: 'Les utilisateur ont été retrouver avec succès ',
                    user
                });
            } else {
                res.status(constants.HTTP_NOT_FOUND).json({
                    error: false,
                    error_code: constants.NO_VALUE_FOUND,
                    message: 'Aucun utilisateur trouvé dans la Base de données ',
                    user
                });
            }
        });
    }

};