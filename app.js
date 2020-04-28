// Requires
var express = require('express');
var mongoose = require('mongoose');

// Inicializar Variables
var app = express();

// Conexion a la Base de Datos
mongoose.connection.openUri('mongodb://localhost:27017/hospitalDB', (err, resp) => {

    if (err) {
        console.log('Error Conectando a la Base de Datos: \x1b[31m%s\x1b[0m', err);
        return;
    }

    console.log('Base de Datos: \x1b[32m%s\x1b[0m', 'Online');

});

// Escuchar Peticiones
app.listen(3000, () => {
    console.log('Exress Server Purto 3000: \x1b[32m%s\x1b[0m', 'Online');
});

// Rutas
app.get('/', (req, resp, next) => {

    resp.status(200).json({
        hasError: false,
        message: 'Peticion realizada correctamente!!'
    });

});