// Requires
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');


// Inicializar Variables
var app = express();

// Body Parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Importar Rutas
var appRoutes = require('./routes/app');
var loginRoutes = require('./routes/login');
var usuarioRoutes = require('./routes/usuarios');


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
app.use('/login', loginRoutes);
app.use('/usuario', usuarioRoutes);


//
app.use('/', appRoutes);