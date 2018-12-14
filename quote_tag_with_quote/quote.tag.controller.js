'use strict';

let QuoteTag = require('./quote.tag.model');
let Tag = require('../quote_tag/tag.model');
var constants = require('../config/constants');

exports.create_a_tag_with_quote = function (req, res) {
    var new_tag_quote = new QuoteTag(req.body);

    if (!new_tag_quote.tag_id || !new_tag_quote.quote_id) {
        res.status(constants.HTTP_BAD_REQUEST).send({
            error: true,
            error_code: constants.EMPTY_FIELDS,
            message: 'Veuillez remplir les champs tag id et quote id ',
        });
    } else {
        QuoteTag.createQuoteTag(new_tag_quote, function (err, tag_quote) {
            if (err) {
                //Si une erreur de duplication de donnée est retourner on le gère comme sa
                if (err.code === 'ER_DUP_ENTRY'){
                    res.status(constants.HTTP_BAD_REQUEST).json({
                        error: true,
                        error_code: constants.DATA_DUPLICATE,
                        message: 'Le tag ' + new_tag_quote.tag_id + ' est déjà ajouter au quote ' + new_tag_quote.quote_id,
                    });
                }else if (err.code === 'ER_NO_REFERENCED_ROW_2'){
                    res.status(constants.HTTP_BAD_REQUEST).json({
                        error: true,
                        error_code: constants.KEY_ID_NOT_FOUND,
                        message: 'L\'id du tag ' + new_tag_quote.tag_id + ' ou l\'id du quote ' + new_tag_quote.quote_id + ' n\'existe pas !',
                    });
                }
                else {
                    res.send(err);
                }
                //
            } else {
                res.status(constants.HTTP_CREATED).json({
                    error: false,
                    error_code: constants.SUCCESSFULLY_COMPLETED,
                    message: 'Ajout effectuer avec succès du tag ' + new_tag_quote.tag_id + ' au quote ' + new_tag_quote.quote_id,
                    tag_quote
                });
            }
        });
    }

};

// Ajouter la verification si le quote existe
exports.get_quote_all_tags = function (req, res) {
    QuoteTag.getQuoteTagByQuoteId(req.params.quote_id, function (err, quote_tags) {
        if (err) {
            res.send(err);
        } else if (quote_tags.length > 0) {
            res.json({
                error: false,
                error_code: constants.SUCCESSFULLY_COMPLETED,
                message: 'Tag pour le quote ' + req.params.quote_id + ' retrouver avec succès ',
                quote_tags
            });
        } else {
            res.status(constants.HTTP_NOT_FOUND).json({
                error: false,
                error_code: constants.NO_VALUE_FOUND,
                message: 'Aucun Tag trouvé pour le quote ' + req.params.quote_id,
                quote_tags
            });
        }
    });
};

exports.get_tag_all_quotes = function (req, res) {
    let tag_id = req.params.tag_id;
    //Vérifie d'abord si le tag existe
    Tag.getTagById(tag_id,function (err, tag) {
        if (err) {
            res.send(err);
        } else if (tag) {
            QuoteTag.getQuoteTagByTagId(req.params.tag_id, function (err, tag_quotes) {
                if (err) {
                    res.send(err);
                } else if (tag_quotes.length > 0) {
                    res.json({
                        error: false,
                        error_code: constants.SUCCESSFULLY_COMPLETED,
                        message: 'Quote pour le tag ' + req.params.tag_id + ' retrouver avec succès ',
                        tag_quotes
                    });
                } else {
                    res.status(constants.HTTP_NOT_FOUND).json({
                        error: false,
                        error_code: constants.NO_VALUE_FOUND,
                        message: 'Aucun Quote trouvé pour le tag ' + req.params.tag_id,
                        tag_quotes
                    });
                }
            });
        } else {
            res.status(constants.HTTP_NOT_FOUND).json({
                error: false,
                error_code: constants.NO_VALUE_FOUND,
                message: 'Le Tag ' + tag_id + ' n\'existe pas dans la Base de données',
                tag
            });
        }
    });
};


/*
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

*/