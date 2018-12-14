'use strict';
let constants = require('../config/constants');

module.exports = function (app) {
    let quote = require('./quote.controller');


    //Pour mettre la version de l'api app.route(constants.API_VERSION + '/author/:authorId')
    app.route(constants.API_VERSION + '/quotes/:quoteId')
        .get(quote.get_a_quote);

    app.route(constants.API_VERSION + '/quotes/')
        .get(quote.get_all_quotes);

    app.route(constants.API_VERSION + '/tags/:tag_id/quotes')
        .get(quote.get_quote_all_tags);

};