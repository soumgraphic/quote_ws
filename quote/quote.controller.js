'use strict';

let Quote = require('./quote.model');
let Users = require('../quote_users/users.model');
let Category = require('../quote_category/category.model');
let Author = require('../quote_author/author.model');
let Tag = require('../quote_tag/tag.model');
let TagWithQuote = require('../quote_tag_with_quote/quote.tag.model');
let constants = require('../config/constants');

let QuoteDetails = function(quote,category,author,tagWithQuote){
  this.quote = quote,
      this.category = category,
      this.author = author,
      this.tagWithQuote = tagWithQuote
};

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


exports.get_a_quote = function (req, res) {
    Quote.getQuoteById(req.params.quoteId, function (err, quote) {
        if (err) {
            res.send(err);
        } else if (quote) {
            Author.getAuthorById(quote.q_author_a_id, function (err, author) {
                if (err) {
                    res.send(err);
                } else {
                    Category.getCategorieById(quote.q_category_c_id, function (err, category) {
                        if (err) {
                            res.send(err);
                        } else {
                            TagWithQuote.getQuoteTagByQuoteId(quote.q_id, function (err, quote_tags) {
                                if (err) {
                                    res.send(err);
                                } else {
                                    quote.author = author;
                                    quote.category = category;
                                    quote.tagWithQuote = quote_tags;
                                    res.json({
                                        error: false,
                                        error_code: constants.SUCCESSFULLY_COMPLETED,
                                        message: 'Quote retrouver avec succès ',
                                        number_of_results: 1,
                                        //Todo: quote: [quote, author],
                                        results: {
                                            quote
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        } else {
            res.status(constants.HTTP_NOT_FOUND).json({
                error: false,
                error_code: constants.NO_VALUE_FOUND,
                message: 'Quote non trouvé dans la Base de données ',
                quote
            });
        }
    });
};

exports.get_all_quotes = function (req, res) {
    Quote.getAllQuotes(function (err, quotes) {
        if (err) {
            res.send(err);
        } else if (quotes.length) {
            const promises = [];
            quotes.forEach(function (quote) {
                try {
                    promises.push(getQuoteAndElements(quote.q_id));
                }catch (e) {
                   console.error(e.message)
                }
            });
            Promise.all(promises).then(function(values){
                res.json({
                    error: false,
                    error_code: constants.SUCCESSFULLY_COMPLETED,
                    message: 'Les quotes ont été retrouver avec succès ',
                    number_of_results: values.length,
                    //Todo: quote: [quote, author],
                    results:
                        values

                }).catch(err => {
                    res.send(err);
                  console.log(err);
                });

            });
        } else {

            res.status(constants.HTTP_NOT_FOUND).json({
                error: false,
                error_code: constants.NO_VALUE_FOUND,
                message: 'Aucun quote trouvé dans la Base de données ',
                quotes
            });
        }
    });
};

exports.delete_a_quote = function (req, res) {
    Quote.getQuoteById(req.params.quoteId, function (err, getQuote) {
        if (err) {
            res.send(err);
        } else if (getQuote.length) {
            Quote.removeQuoteById(req.params.quoteId, function (err,quote) {
                if (err) {
                    res.send(err);
                } else {
                    res.json({
                        error: false,
                        error_code: constants.SUCCESSFULLY_COMPLETED,
                        message: 'Le quote a été supprimé avec succès !'
                    });
                }
            });
        } else {
            res.status(constants.HTTP_NOT_FOUND).json({
                error: false,
                error_code: constants.NO_VALUE_FOUND,
                message: 'Ce quote n\'existe pas dans la Base de données, impossible de la supprimer '
            });
        }
    });
};

// Function utilities

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

function getQuoteAndElements(quoteId) {
    return new Promise(function (resolve,reject) {
        if (quoteId){
            Quote.getQuoteById(quoteId, function (err, quote) {
                if (err) {
                    reject(err);
                } else if (quote) {
                    Author.getAuthorById(quote.q_author_a_id, function (err, author) {
                        if (err) {
                            reject(err);
                        } else {
                            Category.getCategorieById(quote.q_category_c_id, function (err, category) {
                                if (err) {
                                    reject(err);
                                } else {
                                    TagWithQuote.getQuoteTagByQuoteId(quote.q_id, function (err, quote_tags) {
                                        if (err) {
                                            reject(err);
                                        } else {
                                            quote.author = author;
                                            quote.category = category;
                                            quote.tagWithQuote = quote_tags;
                                            resolve(quote);
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });
}


/*

 exports.get_all_quotes = function (req, res) {
 Quote.getAllQuotes(function (err, quote) {
 if (err) {
 res.send(err);
 } else if (quote.length) {

 quote.forEach(function (q) {
 Author.getAuthorById(q.q_author_a_id, function (err, author) {
 if (err) {
 res.send(err);
 } else {
 Category.getCategorieById(q.q_category_c_id, function (err, category) {
 if (err) {
 res.send(err);
 } else {
 TagWithQuote.getQuoteTagByQuoteId(q.q_id, function (err, quote_tags) {
 if (err) {
 res.send(err);
 } else {
 res.setHeader('Content-Type', 'application/json');
 res.write(q, author, category, quote_tags);
 }
 });
 }
 });
 }
 });
 });

 res.end();

 } else {

 res.status(constants.HTTP_NOT_FOUND).json({
 error: false,
 error_code: constants.NO_VALUE_FOUND,
 message: 'Aucun quote trouvé dans la Base de données ',
 quote
 });
 }
 });
 };

 */