// Les routes public de l'API Quotes
module.exports = function(app){
    let indexPublicRouter           = require('../routes/index.js');
    let usersPublicRouter           = require('../quote_users/users.routes');
    let categoryPublicRouter        = require('../quote_category/category.routes');
    let auteurPublicRouter          = require('../quote_author/author.routes');
    let tagPublicRouter             = require('../quote_tag/tag.routes');
    let tagAndQuotePublicRouter     = require('../quote_tag_with_quote/quote.tag.routes');
    let quotePublicRouter           = require('../quote/quote.routes');

    indexPublicRouter(app);

    usersPublicRouter(app);
    categoryPublicRouter(app);
    auteurPublicRouter(app);
    tagPublicRouter(app);
    tagAndQuotePublicRouter(app);
    quotePublicRouter(app);
};