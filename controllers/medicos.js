const { response } = require("express");
const  bcryptjs  = require('bcryptjs');
const { message } = require('../helpers/message');
const  Medico  = require('../models/medico.js')

const obtenerMedicos  = async(req , res = response) => {

    const medico = await Medico.find({estado:true});
    res.json({
        medico
    })
}

const obtenerMedico = async(req , res = response) => {
    const medico = await Medico.findById(req.params.id);  
    res.json({
        msg: (medico.estado)? medico : message.mss_012
    })
}

const crearMedicos  = async(req , res = response) =>{
    const {nombre , apellidos , CI , correo , password , especialidad , ...resto} = req.body;
    const medico = new Medico({ nombre , apellidos , CI , correo , password , especialidad , resto});

    const salt = bcryptjs.genSaltSync();
    medico.password = bcryptjs.hashSync( password, salt);

    await medico.save();   
    res.status(201).json(medico);
}

const actualizarMedico = async(req , res = response) => {

    const { _id, nombre, apellido , especialidad , correo , password , ...resto} = req.body;

    if(correo ) resto.correo = correo;

    if( password ){
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt);
    }
    await Medico.findByIdAndUpdate(req.params.id, resto);

    res.json(
        await Medico.findById(req.params.id) 
    )
}

const eliminarMedico = async(req , res = response) => {
    const medico =await Medico.findById(req.params.id);

    if(!medico.estado){
        return  res.json({
            msg: message.mss_012  
        });
    }
    const { id } = req.params;
    await Medico.findByIdAndUpdate(id , {estado : false});

    res.json(
        await Medico.findById(req.params.id) 
    );
}

module.exports = {
    obtenerMedicos,
    crearMedicos,
    obtenerMedico,
    actualizarMedico,
    eliminarMedico
}