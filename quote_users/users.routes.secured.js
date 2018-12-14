'use strict';

let constants = require('../config/constants');

module.exports = function (app) {
    let user = require('./users.controller');

    app.route(constants.API_VERSION + '/users')
        .get(user.get_all_user);

    app.route(constants.API_VERSION + '/users/:userId')
        .get(user.get_a_user);

    app.route(constants.API_VERSION + '/users/authentication')
        .post(user.user_authentication);
};