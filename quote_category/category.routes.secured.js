'use strict';

let constants = require('../config/constants');

module.exports = function (app) {
    let category = require('./category.controller');

    app.route(constants.API_VERSION + '/categories')
        .post(category.create_a_category);

    app.route(constants.API_VERSION + '/categories/:catId')
        .put(category.update_a_category)
        .delete(category.delete_a_category);
};