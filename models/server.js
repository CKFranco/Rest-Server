const express = require('express') 
const cors = require('cors') 
const { dbConnection } = require('../database/config')

class Server {

    constructor(){
        this.app = express()
        this.port = process.env.PORT
        this.usersPath = '/api/users'
        //todo - Primero se agrega ruta al server (dentro de las funciones constructor y routes)
        this.authPath = '/api/auth'

        //conectar a base de datos
        this.dbConnect()

        //Middlewares
        this.middlewares()

        //Rutas de mi aplicacion
        this.routes()
    }

    async dbConnect(){
        await dbConnection()
    }

    middlewares(){

        // CORS 
        this.app.use(cors())

        //lectura y parseo del body
        this.app.use(express.json())

        //Directorio publico
        this.app.use(express.static('public'))
        
    }

    routes() {
        this.app.use(this.authPath, require('../routes/auth.routes'))
        this.app.use( this.usersPath, require('../routes/user.routes')) 
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port)
        })
    }
}


module.exports = Server