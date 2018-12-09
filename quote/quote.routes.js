'use strict';
let constants = require('../config/constants');

module.exports = function (app) {
    let quote = require('./quote.controller');


    //Pour mettre la version de l'api app.route(constants.API_VERSION + '/author/:authorId')
    app.route('/quote/:quoteId')
        .get(quote.get_a_quote);

    app.route('/quote/')
        .get(quote.get_all_quotes);

};