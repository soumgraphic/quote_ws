'use strict';

module.exports = function (app) {
    var author = require('./author.controller');

    app.route('/author')
        .post(author.create_a_author);

    app.route('/author/:authorId')
        .put(author.update_a_author)
        .delete(author.delete_a_author);
};