'use strict';
var constants = require('../config/constants');

/*module.exports = function (app) {
    app.route('/')
        .get(function(req,res) {
            res.json({welcome_message : "Hello ! Welcome to the QUOTES Rest API of DIARRA Soumaila Abdoulaye ◕‿◕ "});
        });
};*/

module.exports = function (app) {
    app.get('/',function(req,res) {
            res.json({welcome_message : "Hello ! Welcome to the QUOTES Rest API of DIARRA Soumaila Abdoulaye ◕‿◕ " });
        });
};
