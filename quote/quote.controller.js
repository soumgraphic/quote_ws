'use strict';

let Quote = require('./quote.model');
let Users = require('../quote_users/users.model');
let Category = require('../quote_category/category.model');
let Author = require('../quote_author/author.model');
let Tag = require('../quote_tag/tag.model');
let TagWithQuote = require('../quote_tag_with_quote/quote.tag.model');
let constants = require('../config/constants');

//Ajout des tags au quote, verification d'existence user,category,auteur
//Si le tag, la catégorie ou l'auteur n'existe pas le créer automatiquement lors de la création du quote
exports.create_a_quote = function (req, res) {
    let new_quote = new Quote(req.body);
    if (!new_quote.user_id || !new_quote.category_name || !new_quote.author_name || !new_quote.text) {
        res.status(constants.HTTP_BAD_REQUEST).send({
            error: true,
            error_code: constants.EMPTY_FIELDS,
            message: 'Veuillez remplir les champs requis ',
        });
    } else {
        let userId = new_quote.user_id;
        Users.getUserById(userId, function (err, user) {
            if (err) {
                res.send(err);
            } else if (user.length) {
                Category.searchCategorieByNameAndCreateIfNotExist(new_quote.category_name, function (err, category) {
                    if (err) {
                        res.send(err);
                    } else {
                        Author.searchAuthorByNameAndCreateIfNotExist(new_quote.author_name, function (err, author) {
                            if (err) {
                                res.send(err);
                            } else {
                                new_quote.category_id = category.c_id;
                                new_quote.author_id = author.a_id;
                                Quote.createQuote(new_quote,function (err, quote) {
                                    if (err) {
                                        res.send(err);
                                    } else {
                                        //Si des tags sont renseignés
                                        if (req.body.tags_list.length){
                                            createTagsAndAddAllInQuote(quote,req.body.tags_list);
                                        }
                                        res.status(constants.HTTP_CREATED).json({
                                            error: false,
                                            error_code: constants.SUCCESSFULLY_COMPLETED,
                                            message: 'Création du quote effectuer avec succès ! ',
                                            quote
                                        });
                                    }
                                });
                                console.log("Tout s'est bien passée 1, la catégorie est " + category.c_id);
                                console.log("Tout s'est bien passée 1, l'auteur est " + author.a_id);
                                //console.log(req.body.fruits);
                            }
                        });
                    }
                });
            } else {
                res.status(constants.HTTP_NOT_FOUND).json({
                    error: false,
                    error_code: constants.NO_VALUE_FOUND,
                    message: 'L\'utilisateur ' + userId + ' n\'existe pas dans la Base de données ',
                    user
                });
            }
        });
    }
};

function checkCategorieExist(category,req,res){
    if (category.name) {
        Category.searchCategorieByName(category.name, function (err, category) {
            if (err) {
                res.send(err);
            } else if (category.length > 0) {
                console.log("Catégorie retrouver " + category);
                return category;
            } else {
                let new_category = new Category(category);
                Category.createCategory(new_category, function (err, categoryCreated) {
                    if (err) {
                        res.send(err);
                    } else {
                        console.log("Catégorie créer " + categoryCreated);
                        return categoryCreated
                    }
                });
            }
        });
    }
}

function createTagsAndAddAllInQuote(quoteId, tags_list) {

    for (let item of tags_list) {
        //let new_tag = `{"name": "${item}"}`;
        //Si le nom du tag n'est pas vide
        if (item) {
            Tag.searchTagByNameAndCreateIfNotExist(item, function (err, tag) {
                if (err) {
                    console.log(err);
                } else {

                    let quote_id = {quote_id: quoteId};
                    let tag_id = {tag_id: tag.t_id};

                    let quote_tags = Object.assign(quote_id, tag_id);
                    let new_tag_quote = new TagWithQuote(quote_tags);

                    console.log(new_tag_quote);
                    console.log("Le tag " + item + " a comme id " + tag.t_id);

                    TagWithQuote.createQuoteTag(new_tag_quote, function (err, tag_quote) {
                        if (err) {
                            //Si une erreur de duplication de donnée est retourner on le gère comme sa
                            if (err.code === 'ER_DUP_ENTRY') {
                                console.log("Le tag " + new_tag_quote.tag_id + " est déjà ajouter au quote " + new_tag_quote.quote_id);
                            } else {
                                console.log(err);
                            }
                        } else {
                            console.log('Ajout effectuer avec succès du tag ' + new_tag_quote.tag_id + ' au quote ' + new_tag_quote.quote_id)
                        }
                    });

                }
            });

        }
    }

}

/*
function insertQuoteTag() {
    TagWithQuote.createQuoteTag(new_tag_quote, function (err, tag_quote) {
        if (err) {
            //Si une erreur de duplication de donnée est retourner on le gère comme sa
            if (err.code === 'ER_DUP_ENTRY'){
                res.status(constants.HTTP_BAD_REQUEST).json({
                    error: true,
                    error_code: constants.DATA_DUPLICATE,
                    message: 'Le tag ' + new_tag_quote.tag_id + ' est déjà ajouter au quote ' + new_tag_quote.quote_id,
                });
            }else {
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

*/