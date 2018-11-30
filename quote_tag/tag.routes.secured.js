'use strict';

module.exports = function (app) {
    var tag = require('./tag.controller');

    app.route('/tag')
        .post(tag.create_a_tag);

    app.route('/tag/:tagId')
        .put(tag.update_a_tag)
        .delete(tag.delete_a_tag);
};