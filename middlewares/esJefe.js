
const { message } = require('../helpers');

const esJefe = async(req , res = response , next) => {  
    
    if( req.medico.especialidad !== 'JEFE' ){           
        return res.status(401).json({
            msg: message.mss_013
        } );
    }
    next();
}


module.exports = {
    esJefe
}