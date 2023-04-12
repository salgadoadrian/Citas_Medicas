const { response } = require("express");
const { message } = require('../helpers/message');
const Cita_Medica = require('../models/cita_medica');
const { horas_permitidas } = require('../helpers/horas_permitidas')

const Horario_disponible = async(  req, res = response ,next) =>{

    const { id_Medico , hora , fecha} = req.body;

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
            console.log( 'aaaaaaaaaaaaaa' );
    
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

   
    return next();
}

module.exports = {
    Horario_disponible
}