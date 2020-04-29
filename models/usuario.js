var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var rolesValidos = {
    values: ['Admin_Role', 'User_Role'],
    message: '{VALUE} no es un Rol permitido'
};

var usuarioSchema = new Schema({
    nombre: { type: String, required: [true, 'El Nombre es Requerido'] },
    email: { type: String, unique: true, require: [true, 'El Correo es Requerido'] },
    pasword: { type: String, required: [true, 'La contraseña es Requerido'] },
    img: { type: String, required: false },
    role: { type: String, required: true, default: 'User_Role', enum: rolesValidos }
});

usuarioSchema.plugin(uniqueValidator, { message: 'El {PATH} debe ser unico!!' });

module.exports = mongoose.model('Usuario', usuarioSchema);