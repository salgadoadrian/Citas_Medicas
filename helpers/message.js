const { especialidades } = require('./especialidad_medico')

const message = {
    mss_001:'El nombre es obligatorio',
    mss_002:'Los apellidos son obligatorios',
    mss_003:'El carnet de identidad es obligatorio ',
    mss_004:'El carnet de identidad ya existe-NO puede existir dos personas con el mismo CI',
    mss_005:'El correo es obligatorio ',
    mss_006:'El correo ya esta registrado',
    mss_007:'El password tiene que tener mas de 5 caracteres',
    mss_007_1:'El password es obligatorio',
    mss_008:'La especialidad es obligatoria',
    mss_009:'La especialidad no esta definida ' + especialidades,
    mss_010:'No es un id valido',
    mss_011:'El id no existe',
    mss_012:'No esta disponible la persona',
    mss_013:'No tienes permisos para eliminar',
    mss_014:'No se pudo generar el token',
    mss_015:'La descripcion del sintoma es obligatoria',
    mss_016:'El paciente ya tiene asignada una consulta',
    mss_017:'El id del medico es obligatorio',
    mss_018:'El id del paciente es obligatorio',
    mss_019:'Un paciente no puede tener asignada mas de una cita medica',
    mss_020:'El medico no esta disponible-fecha',
    mss_021:'La hora es obligatoria',
    mss_022:'La hora para esa fecha no esta disponible',
    mss_023:'La hora no esta disponible',
    mss_024:'La fecha es obligatoria',
    mss_025:'El medico no esta disponible-Vacaciones',
    mss_026:'fecha no valida',
    mss_027:'Carnet de identidad no valido',


}

module.exports = {
    message
};