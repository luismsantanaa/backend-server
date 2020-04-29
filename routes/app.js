var express = require('express');
var app = express();

app.get('/', (req, res) => {
    res.status(200).json({
        hasError: false,
        message: 'Peticion realizada correctamente!!'
    });
});

module.exports = app;