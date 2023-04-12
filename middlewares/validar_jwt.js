const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const Medico = require('../models/medico.js');


const validarJWT = async( req = request, res = response, next ) => {

    const token = req.header('x-token');
   
    if ( !token ) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }
    
    try {
    
        const { uid } = jwt.verify( token, process.env.SECRET0RPRIVATEKEY);

        const medico = await Medico.findById( uid );
            
        if( !medico ) {
            return res.status(401).json({
                msg: 'Token no válido - usuario no existe DB'
            })
        }

        if ( !medico.estado ) {
            return res.status(401).json({
                msg: 'Token no válido - usuario con estado: false'
            })
        }
              
        req.medico = medico;
        next();

    } catch (error) {

        console.log(error);
        res.status(401).json({
            msg: 'Token no válido'
        })
    }
}

module.exports = {
    validarJWT
}





