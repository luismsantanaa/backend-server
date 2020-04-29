var jwt = require('jsonwebtoken');
var SEED = require('../config/config').SEED;

// ==============================================
// Verificar Token                              |
// ==============================================
exports.tokenValidation = function(req, res, next) {

    var token = req.query.token;

    jwt.verify(token, SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                hasError: true,
                message: 'Token Incorrecto!!',
                errors: err
            });
        }

        req.usuario = decoded.user;

        next();


    });
}