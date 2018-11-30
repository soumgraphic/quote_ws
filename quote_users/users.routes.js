'use strict';

module.exports = function (app) {
    var user = require('./users.controller');

    app.route('/user')
        .post(user.create_a_user);
};