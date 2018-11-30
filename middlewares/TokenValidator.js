var jwt = require('jsonwebtoken');
var constants = require('../config/constants');

module.exports = function(req,res,next) {
    /*
        On met le token soit en param de l'url avec ?
        Avec la méthode post on le met dans le body dans la partie ou on met les values avec comme clé token
        ou on le met en header avec x-access-token et la valeur du token.
     */
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, global.config.mysecret, function(err, decoded) {
            if (err) {
                return res.status(constants.HTTP_UNAUTHORIZED).json({
                    "error" : true,
                    "error_code" : constants.INVALID_TOKEN,
                    "message": 'Token non valide :)'
                });
            }
            req.decoded = decoded;
            next();
        });
    } else {
        // if there is no token
        // return an error
        return res.status(constants.HTTP_ACCESS_DENIED).send({
            "error": true,
            "error_code": constants.NO_TOKEN_PROVIDED,
            "message": 'Aucun token fournis, Accès aux ressources interdit :)'
        });
    }
}