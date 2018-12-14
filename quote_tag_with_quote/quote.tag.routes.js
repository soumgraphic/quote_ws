'use strict';
let constants = require('../config/constants');

module.exports = function (app) {
    let tag_quote = require('./quote.tag.controller');

    //Pour mettre la version de l'api app.route(constants.API_VERSION + '/tag/:tagId')
    app.route(constants.API_VERSION + '/quotes/:quote_id/tags')
        .get(tag_quote.get_quote_all_tags);

    /*
   app.route('/tag/')
       .get(tag.get_all_tag);

       */
};