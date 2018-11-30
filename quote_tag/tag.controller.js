'use strict';

var Tag = require('./tag.model');
var constants = require('../config/constants');

exports.create_a_tag = function (req, res) {
    var new_tag = new Tag(req.body);

    if (!new_tag.name) {
        res.status(constants.HTTP_BAD_REQUEST).send({
            error: true,
            error_code: constants.EMPTY_FIELDS,
            message: 'Veuillez remplir le champ nom ',
        });
    } else {
        Tag.createTag(new_tag, function (err, tag) {
            if (err) {
                res.send(err);
            } else {
                res.status(constants.HTTP_CREATED).json({
                    error: false,
                    error_code: constants.SUCCESSFULLY_COMPLETED,
                    message: 'Création du tag ' + new_tag.name + ' effectuer avec succès ! ',
                    tag
                });
            }
        });
    }

};

exports.get_a_tag = function (req, res) {
    Tag.getTagById(req.params.tagId, function (err, tag) {
        if (err) {
            res.send(err);
        } else if (tag.length > 0) {
            res.json({
                error: false,
                error_code: constants.SUCCESSFULLY_COMPLETED,
                message: 'Tag retrouver avec succès ',
                tag
            });
        } else {
            res.status(constants.HTTP_NOT_FOUND).json({
                error: false,
                error_code: constants.NO_VALUE_FOUND,
                message: 'Tag non trouvé dans la Base de données ',
                tag
            });
        }
    });
};

exports.get_all_tag = function (req, res) {

    //Si le mot search est présente dans l'url et qu'il est renseigné
    let search = req.query.search;
    if (search){
        Tag.searchTagByName(search, function (err, tag) {
            if (err) {
                res.send(err);
            } else if (tag.length > 0) {
                res.json({
                    error: false,
                    error_code: constants.SUCCESSFULLY_COMPLETED,
                    message: 'Tag retrouver avec succès ',
                    tag
                });
            } else {
                res.status(constants.HTTP_NOT_FOUND).json({
                    error: false,
                    error_code: constants.NO_VALUE_FOUND,
                    message: 'Tag non trouvé dans la Base de données ',
                    tag
                });
            }
        });
    } else {
        Tag.getAllTags(function (err, tag) {
            if (err) {
                res.send(err);
            } else if (tag.length > 0) {
                res.json({
                    error: false,
                    error_code: constants.SUCCESSFULLY_COMPLETED,
                    message: 'Les tags ont été retrouver avec succès ',
                    tag
                });
            } else {
                res.status(constants.HTTP_NOT_FOUND).json({
                    error: false,
                    error_code: constants.NO_VALUE_FOUND,
                    message: 'Aucun tag trouvé dans la Base de données ',
                    tag
                });
            }
        });
    }
};

exports.update_a_tag = function (req, res) {

    var update_tag = new Tag(req.body);
    //Réflechir à comment faire trim sur name
    if (!update_tag.name) {
        res.status(constants.HTTP_BAD_REQUEST).send({
            error: true,
            error_code: constants.EMPTY_FIELDS,
            message: 'Veuillez remplir le champ nom du tag',
        });
    } else {
        Tag.getTagById(req.params.tagId, function (err, get_tag) { // On vérifie d'abord si le tag existe
            if (err) {
                res.send(err);
            } else if (get_tag.length > 0) { //Si le tag existe dans la base
                Tag.updateTagById(req.params.tagId, update_tag, function (err, tag) {
                    if (err) {
                        res.send(err);
                    } else {
                        res.json({
                            error: false,
                            error_code: constants.SUCCESSFULLY_COMPLETED,
                            message: 'Le tag ' + get_tag[0].t_name + ' a bien été renommer en ' + update_tag.name
                        });
                    }
                });

            } else {
                res.status(constants.HTTP_NOT_FOUND).json({
                    error: false,
                    error_code: constants.NO_VALUE_FOUND,
                    message: 'Ce tag n\'existe pas dans la Base de données, impossible de la modifier ',
                });
            }
        });
    }

};

exports.delete_a_tag = function (req, res) {
    Tag.getTagById(req.params.tagId, function (err, getTag) {
        if (err) {
            res.send(err);
        } else if (getTag.length > 0) {
            Tag.removeTagById(req.params.tagId, function (err,tag) {
                if (err) {
                    res.send(err);
                } else {
                    res.json({
                        error: false,
                        error_code: constants.SUCCESSFULLY_COMPLETED,
                        message: 'Le tag a été supprimé avec succès !'
                    });
                }
            });
        } else {
            res.status(constants.HTTP_NOT_FOUND).json({
                error: false,
                error_code: constants.NO_VALUE_FOUND,
                message: 'Ce tag n\'existe pas dans la Base de données, impossible de la supprimer '
            });
        }
    });
};