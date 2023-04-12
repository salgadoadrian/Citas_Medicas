const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config.js');

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT ;
        this.path = {
            paciente: '/api/pacientes',
            medico: '/api/medicos',
            auth: '/api/auth',
            citas_medicas: '/api/citas_medicas',
        }

        //conectar a base de datos
        this.conectarDB();

        //Middleware
        this.middleware();
        //Rutas de mi aplicacion
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middleware(){
        //cors
        this.app.use(cors());

        // lectura y parseo de body
        this.app.use(express.json());

        //directorio puplico
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use( this.path.medico , require('../routes/medico.js') );
        this.app.use( this.path.paciente , require('../routes/paciente.js') );
        this.app.use( this.path.auth , require('../routes/auth.js') );
        this.app.use( this.path.citas_medicas , require('../routes/cita_medica.js') );
    }

    listen(){
        this.app.listen(this.port , () => {
            console.log('corrieendo en el puerto ', this.port);
        }); 
    }
}




module.exports = Server;