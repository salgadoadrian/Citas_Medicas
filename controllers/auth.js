
const { response } = require("express");
const bcryptjs = require('bcryptjs');
const {generarJWT} = require('../helpers/generar_jwt.js');
const Medico = require('../models/medico');

const login = async(req, res = response) => {
    
    const {correo , password } = req.body;

    const medico = await Medico.findOne({ correo });
    if( !medico ) {
        return res.status(400).json({
            msg: "Usuario / Password no son correctas - correo"
        })
    }
    
    try {
  
        if(!medico.estado) {
            return res.status(400).json({
                msg: "Usuario / Password no son correctas - El usuario no esta disponible"
            })
        }

        const validPassword = await bcryptjs.compare(password , medico.password );
        if(!validPassword){
            return res.status(400).json({
                msg: "Usuario / Password no son correctas - password incorrecto"
            })
        }

        const token = await generarJWT(medico.id);

        res.json({
            msg : 'Login ok',
            medico,
            token
        })
     
    } catch (error) {
       // console.log(error);
        return res.status(500).json({
            msg:"Hable con el administrador"
        })
    }  
}















module.exports = {
    login
}