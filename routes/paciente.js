const { Router } = require('express');
const {check} = require('express-validator');
const {
    message ,
    db_validator
} = require('../helpers');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar_jwt');
const { 
    obtenerPacientes,
    obtenerPaciente,
    crearPaciente,
    actualizarPaciente,
    eliminarPaciente
} = require('../controllers/pacientes');
const { esJefe } = require('../middlewares/esJefe');

const router = Router();
 
router.get('/', obtenerPacientes );

router.get('/:id',[
    check('id',message.mss_010).isMongoId(),
    check('id').custom(db_validator.existePacientePorId),
    validarCampos
],obtenerPaciente);

router.put('/:id',[
    check('id', message.mss_010).isMongoId(),
    check('id').custom(db_validator.existePacientePorId),
    validarCampos,
], actualizarPaciente);


router.post('/',[
    check('nombre', message.mss_001).not().isEmpty(),
    check('apellidos', message.mss_002).not().isEmpty(),
    check('CI', message.mss_003).not().isEmpty(),
    check('CI').custom(db_validator.CIexiste),
    check('correo', message.mss_005).isEmail(),
    check('correo').custom( db_validator.emailExiste),
    check('password', message.mss_007_1).not().isEmpty(),
    check('password', message.mss_007).isLength({ min: 8 }),
    check('des_sint', message.mss_015).not().isEmpty(),
    validarCampos
],crearPaciente);

router.delete('/:id',[
    validarJWT,
    esJefe,
    check('id', message.mss_010).isMongoId(),
    check('id').custom(db_validator.existePacientePorId),
    validarCampos,
], eliminarPaciente);

module.exports = router;

