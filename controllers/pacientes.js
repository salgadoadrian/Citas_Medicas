const { response } = require("express");
const  bcryptjs  = require('bcryptjs');
const { message } = require('../helpers/message');
const  Paciente  = require('../models/paciente.js')

const obtenerPacientes = async(req , res = response) => {

    const paciente = await Paciente.find({estado:true});
    res.json({
        paciente
    })
}

const obtenerPaciente = async(req , res = response) => {
    const paciente = await Paciente.findById(req.params.id);  
    res.json({
        msg: (paciente.estado)? paciente : message.mss_012
    })
}



const crearPaciente  = async(req , res = response) =>{
    const {nombre , apellidos , CI , correo , password , des_sint , ...resto} = req.body;
    const paciente = new Paciente({ nombre , apellidos , CI , correo , password , des_sint , resto});

    const salt = bcryptjs.genSaltSync();
    paciente.password = bcryptjs.hashSync( password, salt);

    await paciente.save();   
    res.status(201).json(paciente);

}


const actualizarPaciente = async(req , res = response) => {

    const { _id, nombre, apellido , des_sint , correo , password , ...resto} = req.body;

    if(correo ) resto.correo = correo;

    if( password ){
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt);
    }
    await Paciente.findByIdAndUpdate(req.params.id, resto);

    res.json(
        await Paciente.findById(req.params.id) 
    )
}

const eliminarPaciente = async(req , res = response) => {
    const paciente =await Paciente.findById(req.params.id);

    if(!paciente.estado){
        return  res.json({
            msg: message.mss_012  
        });
    }
    const { id } = req.params;
    await Paciente.findByIdAndUpdate(id , {estado : false});

    res.json(
        await Paciente.findById(req.params.id) 
    );
}


module.exports = {
    obtenerPacientes,
    obtenerPaciente,
    crearPaciente,
    actualizarPaciente,
    eliminarPaciente
}
