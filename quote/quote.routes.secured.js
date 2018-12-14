'use strict';

let constants = require('../config/constants');

module.exports = function (app) {
    let quote = require('./quote.controller');

    app.route(constants.API_VERSION + '/quotes')
        .post(quote.create_a_quote);

     app.route(constants.API_VERSION + '/quotes/:quoteId')
     .delete(quote.delete_a_quote);

/*
app.route('/author/:authorId')
    .put(author.update_a_author)
    .delete(author.delete_a_author);
    */
};