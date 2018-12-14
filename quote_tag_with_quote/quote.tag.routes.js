'use strict';
let constants = require('../config/constants');

module.exports = function (app) {
    let tag_quote = require('./quote.tag.controller');

    //Pour mettre la version de l'api app.route(constants.API_VERSION + '/tag/:tagId')
    app.route(constants.API_VERSION + '/tag-quote/quotes/:quote_id')
        .get(tag_quote.get_quote_all_tags);

    app.route(constants.API_VERSION + '/tag-quote/tags/:tag_id')
        .get(tag_quote.get_tag_all_quotes);

    /*
   app.route('/tag/')
       .get(tag.get_all_tag);

       */
};