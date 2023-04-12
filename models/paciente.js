 
const { Schema, model } = require('mongoose');

const PacienteSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
    },
    apellidos: {
        type: String,
        required: [true, 'El apellido es obligatorio'],
    },
    CI : {
        type: String,
        required: [true, 'El CI es obligatorio'],
        unique: true
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
    },
    img: {
        type: String,
    },
    estado: {
        type: Boolean,
        default: true
    },
    des_sint: {
        type : String,
        required: [true, 'La descripcion de los sintomas es obligatorio'],
    }
});

PacienteSchema.methods.toJSON = function() {
    const { __v, password, _id,  ...paciente  } = this.toObject();
    paciente.uid = _id;
    return paciente;
}

module.exports = model( 'Paciente', PacienteSchema );
