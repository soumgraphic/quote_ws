'use strict';

module.exports = function (app) {
    var category = require('./category.controller');

    app.route('/category')
        .post(category.create_a_category);

    app.route('/category/:catId')
        .put(category.update_a_category)
        .delete(category.delete_a_category);
};