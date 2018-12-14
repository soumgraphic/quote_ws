'use strict';
let constants = require('../config/constants');

module.exports = function (app) {
    var author = require('./author.controller');

    //Pour mettre la version de l'api app.route(constants.API_VERSION + '/author/:authorId')
    app.route(constants.API_VERSION + '/authors/:authorId')
        .get(author.get_a_author);

    app.route(constants.API_VERSION + '/authors/')
        .get(author.get_all_author);
};