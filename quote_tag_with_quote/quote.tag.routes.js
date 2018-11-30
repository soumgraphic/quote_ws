'use strict';
var constants = require('../config/constants');

module.exports = function (app) {
    let tag_quote = require('./quote.tag.controller');

    //Pour mettre la version de l'api app.route(constants.API_VERSION + '/tag/:tagId')
    app.route('/tag-quote/quote/:quote_id')
        .get(tag_quote.get_quote_all_tags);

    app.route('/tag-quote/tag/:tag_id')
        .get(tag_quote.get_tag_all_quotes);

    /*
   app.route('/tag/')
       .get(tag.get_all_tag);

       */
};