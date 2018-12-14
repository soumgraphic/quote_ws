'use strict';
let constants = require('../config/constants');

module.exports = function (app) {
    let category = require('./category.controller');

    //Pour mettre la version de l'api app.route(constants.API_VERSION + '/category/:catId')
    app.route(constants.API_VERSION + '/categories/:catId')
        .get(category.get_a_category);

    app.route(constants.API_VERSION + '/categories/')
        .get(category.get_all_category);

};