
const { Router } = require('express');
const {check} = require('express-validator');
const { message , db_validator } = require('../helpers');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar_jwt');
const { esJefe } = require('../middlewares/esJefe');
const { 
    obtenerMedicos, 
    crearMedicos,
    obtenerMedico,
    actualizarMedico,
    eliminarMedico
} = require('../controllers/medicos');

const router = Router();

router.get('/', obtenerMedicos );

router.get('/:id',[
    check('id',message.mss_010).isMongoId(),
    check('id').custom(db_validator.existeMedicoPorId),
    validarCampos
],obtenerMedico);

router.put('/:id',[
    check('id', message.mss_010).isMongoId(),
    check('id').custom(db_validator.existeMedicoPorId),
    validarCampos,
], actualizarMedico);

router.post('/',[
    check('nombre', message.mss_001).not().isEmpty(),
    check('apellidos', message.mss_002).not().isEmpty(),
    check('CI', message.mss_003).not().isEmpty(),
    check('CI').custom(db_validator.CIexiste),
    check('correo', message.mss_005).isEmail(),
    check('correo').custom( db_validator.emailExiste),
    check('password', message.mss_007).isLength({ min: 8 }),
    check('especialidad', message.mss_008).not().isEmpty(),
    check('especialidad').custom( db_validator.emailEspecialidad),
    validarCampos
],crearMedicos);

router.delete('/:id',[
    validarJWT,
    esJefe,
    check('id', message.mss_010).isMongoId(),
    check('id').custom(db_validator.existeMedicoPorId),
    validarCampos,
], eliminarMedico);

   
module.exports = router;




