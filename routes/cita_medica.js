const { Router } = require('express');
const {check} = require('express-validator');
const { message , db_validator } = require('../helpers');
const { validarCampos } = require('../middlewares/validar-campos');
const { Horario_disponible } = require('../middlewares/horarios_disponibles')
const { validarJWT } = require('../middlewares/validar_jwt');
const { 
    obtenerCitas_Medicas,
    obtenerCita_Medica,
    crearCita_Medica,
    actualizarCita_Medica,
    eliminarCita_Medica
} = require('../controllers/cita_medica');
const { esJefe } = require('../middlewares/esJefe');

const router = new Router();

router.get('/', obtenerCitas_Medicas);

router.get('/:id', [
    check('id',message.mss_010).isMongoId(),
    check('id').custom(db_validator.existeCita_MedicaPorId),
    validarCampos
],obtenerCita_Medica);


router.post('/',[
    check('id_Medico', message.mss_017).not().isEmpty(),
    check('id_Medico', message.mss_010).isMongoId(),
    check('id_Medico').custom(db_validator.existeMedicoPorId),
    check('id_Medico').custom(db_validator.Medico_disponible_Estado),
    check('id_Paciente', message.mss_018).not().isEmpty(),
    check('id_Paciente', message.mss_010).isMongoId(),
    check('id_Paciente').custom(db_validator.existePacientePorId),
    check('id_Paciente').custom(db_validator.existeCita_Medica_UsuarioPorId),
    check('fecha', message.mss_024).not().isEmpty(),
    check('fecha').custom(db_validator.fecha_correcta),
    check('hora', message.mss_021).not().isEmpty(),
    validarCampos,
    Horario_disponible
],crearCita_Medica);

router.put('/:id',[

    check('id', message.mss_010).isMongoId(),
    check('id').custom(db_validator.existeCita_MedicaPorId),
    check('fecha', message.mss_024).not().isEmpty(),
    check('fecha').custom(db_validator.fecha_correcta),
    check('hora', message.mss_021).not().isEmpty(),
    validarCampos,
], actualizarCita_Medica);

router.delete('/:id',[
    validarJWT,
    //esJefe,
    check('id', message.mss_010).isMongoId(),
    check('id').custom(db_validator.existeCita_MedicaPorId),
  //  check('id').custom(db_validator.Medico_Atiende),
    validarCampos,
], eliminarCita_Medica);


module.exports = router;