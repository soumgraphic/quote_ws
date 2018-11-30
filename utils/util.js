class Utils{

    //Tester si l'argument passé en paramètre est un objet
    isObject = function(a) {
        return (!!a) && (a.constructor === Object);
    };

    //Tester si l'argument passé en paramètre est un array (tableau)
    isArray = function(a) {
        return (!!a) && (a.constructor === Array);
    };
}

