// Les routes privées de l'API Quotes
module.exports = function(app){
    let usersPrivateRouter    = require('../quote_users/users.routes.secured');
    let categoryPrivateRouter = require('../quote_category/category.routes.secured');
    let auteurPrivateRouter   = require('../quote_author/author.routes.secured');
    let tagPrivateRouter      = require('../quote_tag/tag.routes.secured');
    let tagAndQuotePrivateRouter = require('../quote_tag_with_quote/quote.tag.routes.secured');
    let quotePrivateRouter = require('../quote/quote.routes.secured');

    usersPrivateRouter(app);
    auteurPrivateRouter(app);
    categoryPrivateRouter(app);
    tagPrivateRouter(app);
    tagAndQuotePrivateRouter(app);
    quotePrivateRouter(app);
};