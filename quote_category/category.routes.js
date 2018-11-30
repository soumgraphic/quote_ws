'use strict';
var constants = require('../config/constants');

module.exports = function (app) {
    var category = require('./category.controller');

    //Pour mettre la version de l'api app.route(constants.API_VERSION + '/category/:catId')
    app.route('/category/:catId')
        .get(category.get_a_category);

    app.route('/category/')
        .get(category.get_all_category);

};