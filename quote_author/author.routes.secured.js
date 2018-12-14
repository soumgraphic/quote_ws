'use strict';
let constants = require('../config/constants');
module.exports = function (app) {
    var author = require('./author.controller');

    app.route(constants.API_VERSION + '/authors')
        .post(author.create_a_author);

    app.route(constants.API_VERSION + '/authors/:authorId')
        .put(author.update_a_author)
        .delete(author.delete_a_author);
};