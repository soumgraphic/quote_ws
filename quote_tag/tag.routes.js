'use strict';
let constants = require('../config/constants');

module.exports = function (app) {
    let tag = require('./tag.controller');

    //Pour mettre la version de l'api app.route(constants.API_VERSION + '/tag/:tagId')
    app.route(constants.API_VERSION + '/tags/:tagId')
        .get(tag.get_a_tag);

    app.route(constants.API_VERSION + '/tags/')
        .get(tag.get_all_tag);
};