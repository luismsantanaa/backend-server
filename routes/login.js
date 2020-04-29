var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var SEED = require('../config/config').SEED;
var app = express();
var Usuario = require('../models/usuario');


// ==============================================
// Metodo de Login                              |
// ============================================== 
app.post('/', (req, res) => {

    var body = req.body;

    Usuario.findOne({ email: body.email }, (err, userDb) => {

        if (err) {
            return res.status(500).json({
                hasError: true,
                message: 'Error buscando Usuario!!',
                errors: err
            });
        }

        if (!userDb) {

            return res.status(400).json({
                hasError: true,
                message: 'Credenciales Incorrectas - email!!' + body.email
            });
        }

        if (!bcrypt.compareSync(body.pasword, userDb.pasword)) {
            return res.status(400).json({
                hasError: true,
                message: 'Credenciales Incorrectas - pasword!!'
            });
        }

        // crear token!!
        userDb.pasword = ':)';

        var token = jwt.sign({ usuario: userDb }, SEED, { expiresIn: 14400 });

        res.status(200).json({
            hasError: false,
            id: userDb.id,
            token: token,
            usuario: userDb
        });

    });




});


















module.exports = app;