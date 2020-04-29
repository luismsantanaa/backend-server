var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var mdAutenticacion = require('../middlewares/authentications');


var app = express();
var Usuario = require('../models/usuario');

// ==============================================
// Buscar todos los Usuarios                    |
// ==============================================
app.get('/', (req, res) => {

    Usuario.find({}, 'nombre email img role')
        .exec(
            (err, users) => {
                if (err) {
                    return res.status(500).json({
                        hasError: true,
                        message: 'Error Cargando Usuarios!!',
                        errors: err
                    });
                }

                res.status(200).json({
                    hasError: false,
                    usuarios: users
                });

            });
});

// ==============================================
// Crear un nuevo usuario                       |
// ==============================================
app.post('/', mdAutenticacion.tokenValidation, (req, res) => {

    var body = req.body;

    var usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        pasword: bcrypt.hashSync(body.pasword, 10),
        img: body.img,
        role: body.role
    });

    usuario.save((err, savedUser) => {

        if (err) {
            return res.status(400).json({
                hasError: true,
                message: 'Error al Crear Usuarios!!',
                errors: err
            });
        }

        res.status(201).json({
            hasError: false,
            body: savedUser
        });

    });

});

// ==============================================
// Actualizar usuario Usuario                   |
// ==============================================
app.put('/:id', mdAutenticacion.tokenValidation, (req, res) => {

    var id = req.params.id;
    var body = req.body;

    Usuario.findById(id, (err, user) => {

        if (err) {
            return res.status(500).json({
                hasError: true,
                message: 'Error al Buscar Usuario!!',
                errors: err
            });
        }

        if (!user) {
            return res.status(400).json({
                hasError: true,
                message: 'Usuario con el Id ' + id + ' No Encontrado!!',
                errors: { message: 'No existe un usuario con ese Id' }
            });
        }

        user.nombre = body.nombre;
        user.email = body.email;
        user.role = body.role;

        user.save((err, userSaved) => {
            if (err) {
                return res.status(400).json({
                    hasError: true,
                    message: 'Error al Actulizar Usuario!!',
                    errors: err
                });
            }

            userSaved.pasword = ':)';

            res.status(200).json({
                hasError: false,
                message: 'Usuario ' + userSaved.nombre + ' actualizado correctamente!',
                usuario: userSaved
            });

        });

    });

});

// ==============================================
// Borrar Usuario por Id                        |
// ==============================================
app.delete('/:id', mdAutenticacion.tokenValidation, (req, res) => {

    var id = req.params.id;

    Usuario.findByIdAndRemove(id, (err, userDeleted) => {

        if (err) {
            return res.status(400).json({
                hasError: true,
                message: 'Error al Borrar el Usuario!!',
                errors: err
            });
        }

        if (!userDeleted) {
            return res.status(400).json({
                hasError: true,
                message: 'No existe un usuario con el Id ' + id + '!!',
                errors: err
            });
        }

        userDeleted.pasword = ':)';

        res.status(200).json({
            hasError: false,
            message: 'Usuario Borrado exitosamente!!',
            body: userDeleted
        });

    });

});

module.exports = app;