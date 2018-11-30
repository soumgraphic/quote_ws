'use strict';

module.exports = function (app) {
    var user = require('./users.controller');

    app.route('/user')
        .get(user.get_all_user);

    app.route('/user/:userId')
        .get(user.get_a_user);

    app.route('/user/authentication')
        .post(user.user_authentication);
};