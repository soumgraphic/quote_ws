'use strict';
var constants = require('../config/constants');

module.exports = function (app) {
    var tag = require('./tag.controller');

    //Pour mettre la version de l'api app.route(constants.API_VERSION + '/tag/:tagId')
    app.route('/tag/:tagId')
        .get(tag.get_a_tag);

    app.route('/tag/')
        .get(tag.get_all_tag);
};