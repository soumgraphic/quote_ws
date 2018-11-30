'use strict';

module.exports = function (app) {
    var quote = require('./quote.controller');

    app.route('/quote')
        .post(quote.create_a_quote);

/*
app.route('/author/:authorId')
    .put(author.update_a_author)
    .delete(author.delete_a_author);
    */
};