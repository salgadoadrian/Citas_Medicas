 
const { Schema, model } = require('mongoose');
const { horas_permitidas } = require('../helpers/horas_permitidas')

const Cita_MedicaSchema = Schema({
    id_Medico: {
        type: String,
        required: [true, 'El id del medico es obligatorio'],
    },
    id_Paciente: {
        type: String,
        required: [true, 'El id del paciente es obligatorio'],
    },
    fecha : {
        type: String,
        required: [true, 'La fecha es obligatoria'],
    },
        hora: {
        type : String,
        required: true,
        emun: horas_permitidas
    },
    atendida: {
        type: Boolean,
        default: false
    }
    });

Cita_MedicaSchema.methods.toJSON = function() {
    const { __v, _id,  ...cita_medica  } = this.toObject();
    cita_medica.uid = _id;
    return cita_medica;
}

module.exports = model( 'Citas_Medica', Cita_MedicaSchema );
