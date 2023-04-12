const { message } = require('../helpers/message');
const Medico = require('../models/medico.js');
const Cita_Medica = require('../models/cita_medica');
const Paciente = require('../models/paciente');
const { especialidades } = require('./especialidad_medico');


const CIexiste = async(CI = '') => {
    
    let bandera = false , comprobar =0;
    for(let i = 0; i < CI.length;i++){
        if( CI[i] >= 0 && CI[i] <= 9){
            comprobar++;           
        }
    }

    if( CI.length !== 11 || comprobar !== CI.length ){
        throw new Error(message.mss_027 );
    }

    const existeCI_medico = await Medico.findOne({CI});
    const existeCI_paciente = await Paciente.findOne({CI});
    if( existeCI_medico || existeCI_paciente){
        throw new Error(message.mss_004 );
    }
}


const emailExiste = async(correo = '') =>{

    const existeCorreo_medico = await Medico.findOne({correo});
    const existeCorreo_paciente = await Paciente.findOne({correo});

    if( existeCorreo_medico || existeCorreo_paciente ) {
        throw new Error(message.mss_006);

    }
}

const emailEspecialidad = async(especialidad = '') =>{

    const especial = especialidades.includes(especialidad);

    if( !especial ) {
        throw new Error(message.mss_009);

    }
}

const existeMedicoPorId = async( id ) =>{

    const existeMedico = await Medico.findById(id);
 
    if( !existeMedico  ) {
        throw new Error(message.mss_011 +' {id: '+id+'}');

    }
}
const existePacientePorId = async( id ) =>{

    const existePaciente = await Paciente.findById(id);
 
 
    if( !existePaciente  ) {
        throw new Error(message.mss_011 +' {id: '+id+'}');

    }
    
}

const existeCita_MedicaPorId = async( id ) =>{

    const existe = await Cita_Medica.findById(id);
 
    if( !existe  ) {
        throw new Error(message.mss_011 +' {id: '+id+'}');
    }
}

const existeCita_Medica_UsuarioPorId = async( id_Paciente='' ) =>{

    const existe = await Cita_Medica.findOne({id_Paciente});
    
 
    if( existe  ) {
        throw new Error(message.mss_016 +' {id: '+id_Paciente+'}');
    }

}


const Medico_disponible_Estado = async( id = '' ) =>{

    const existe = await Medico.findById(id , {estado : true});

    if(!existe){
        throw new Error(message.mss_025 +' {id: '+id+'}');
    }
}

const fecha_correcta = async( fecha = '' ) =>{
    
    if(fecha.length !== 8){
        throw new Error(message.mss_026 +'{correcta : dia / mes / anio => 12012023}');
    }
}



module.exports ={
    CIexiste,
    emailExiste ,
    emailEspecialidad,
    existeMedicoPorId,
    existePacientePorId,
    existeCita_MedicaPorId,
    existeCita_Medica_UsuarioPorId,
    Medico_disponible_Estado,
    fecha_correcta,

}