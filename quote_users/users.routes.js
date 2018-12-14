'use strict';

let constants = require('../config/constants');

module.exports = function (app) {
    let user = require('./users.controller');

    app.route(constants.API_VERSION + '/users')
        .post(user.create_a_user);
};