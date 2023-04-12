 
const { Schema, model } = require('mongoose');
const { especialidades } = require('../helpers/especialidad_medico.js');

const MedicosSchema = Schema({
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
    especialidad: {
        type : String,
        required: true,
        emun: especialidades
    }
});

MedicosSchema.methods.toJSON = function() {
    const { __v, password, _id,  ...medico  } = this.toObject();
    medico.uid = _id;
    return medico;
}

module.exports = model( 'Medico', MedicosSchema );
