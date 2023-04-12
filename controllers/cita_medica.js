const { response } = require("express");
const { horas_permitidas } = require('../helpers/horas_permitidas')
const { message } = require('../helpers/message');
const  Cita_Medica  = require('../models/cita_medica');
const  Medico  = require('../models/medico');




const obtenerCitas_Medicas= async(req , res = response) => {

    const cita_medicas = await Cita_Medica.find({atendida: false});
    console.log( cita_medicas );
    
    res.json({
        cita_medicas
    })
}

const obtenerCita_Medica = async(req , res = response) => {
    const cita_medica = await Cita_Medica.findById(req.params.id);  
    res.json({
        msg: (!cita_medica.estado)? cita_medica : {
                                            mms: message.mss_016
                                        }
    })
}

const crearCita_Medica  = async(req , res = response) =>{
    
    const { id_Medico, id_Paciente , fecha , hora } = req.body;

    const cita_medica = new Cita_Medica({id_Medico, id_Paciente , fecha , hora});

    await cita_medica.save();

    res.status(201).json({
       cita_medica
    });
}

const actualizarCita_Medica = async(req , res = response) => {

    const { hora , fecha } = req.body;

    const citaaaa = await Cita_Medica.findById(req.params.id);
    const id_Medico = citaaaa.id_Medico;

    if( !horas_permitidas.includes(hora) ){
        return res.status(400).json({
            msg: message.mss_023 +' {Permitidas: '+horas_permitidas+'}'        
        } );
    }

    const cita = await Cita_Medica.find({id_Medico});
    let bandera = false;
    let medico_id = '';

    for(let i=0;i<cita.length;i++){
        if(cita[i].fecha === fecha && cita[i].hora === hora){  
            bandera = true;  
            medico_id = cita[i].id_Medico; 
            i = cita.length;             
        }
    }

    if(bandera){
        return res.status(400).json({              
            msg: message.mss_022 +' {hora: '+hora+'}{Medico: '+medico_id+'}'
        });
    }
 
    await Cita_Medica.findByIdAndUpdate(req.params.id, {fecha, hora});

    return res.json(
        await Cita_Medica.findById(req.params.id) 
    )
}

const eliminarCita_Medica = async(req , res = response) => {

    const medica = await Cita_Medica.findById(req.params.id);
    const medico = await Medico.findById(medica.id_Medico);  
    
    if( req.medico.CI !== medico.CI){
        return res.status(401).json({
            msg: message.mss_013+' {No le pertenece la cita medica}'     
        } );
        
    }

    const cita = await Cita_Medica.deleteOne(medica);

    res.json({
        msg: 'Delete ok',
        medica
    });
}



module.exports = {
    obtenerCitas_Medicas,
    obtenerCita_Medica,
    crearCita_Medica,
    actualizarCita_Medica,
    eliminarCita_Medica
}