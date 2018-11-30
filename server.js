const express = require ('express'),
    app = express (),
    bodyParser = require('body-parser');
port = process.env.PORT || 8080;
global.config = require('./config/config');

//Parse l'application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded si extend: false on peut faire l'appel de cette manière
app.use(bodyParser.urlencoded({extend: true}));

//Les routes des ressources de l'api qui sont public
require('./routes/routes.public')(app);

//Le middleware pour la validation des tokens pour garantir la sécurité des ressources non publics
app.use(require('./middlewares/TokenValidator'));

//Les routes des ressources sécurisées de l'api qui nécessite une authentification et un token
require('./routes/routes.secured')(app);

app.listen(port);
console.log('QUOTES_WS API server started on: ' + port);

//Pour que l'app soit visible partout dans l'application
module.exports = app;