'use strict';
let constants = require('../config/constants');

module.exports = function (app) {
    let tag = require('./tag.controller');

    app.route(constants.API_VERSION + '/tags')
        .post(tag.create_a_tag);

    app.route(constants.API_VERSION + '/tags/:tagId')
        .put(tag.update_a_tag)
        .delete(tag.delete_a_tag);
};