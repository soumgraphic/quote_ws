'use strict';

module.exports = function (app) {
    let tag_quote = require('./quote.tag.controller');

    app.route('/tag-quote')
        .post(tag_quote.create_a_tag_with_quote);

    /*
    app.route('/tag/:tagId')
        .put(tag.update_a_tag)
        .delete(tag.delete_a_tag);
        */
};