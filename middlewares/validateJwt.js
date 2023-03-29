const { response, request } = require('express')
const jwt = require('jsonwebtoken')

const Usuario = require('../models/usuario')

const validateJWT = async ( req = request, resp = response, next ) => {

     const token = req.header('x-token')

     if(!token){
        resp.status(401).json({
            msj: 'Usuario no autenticado'
        })
     }
     
     try {

        const {uid} = jwt.verify(token, process.env.GENERATEJWT)

        const authUser = await Usuario.findById(uid)

        if(!authUser){
            return resp.status(401).json({
                msg: 'Token no valido - Usuario no existe'
            })
        }

        //todo Verificar si usuario no ha sido deshabilitado
        if( !authUser.estado ){
            return resp.status(401).json({
                msg: 'Token no valido - disabled user'
            })
        }
        

        // todo Crea un nuevo valor en el objeto req
        req.authUser = authUser

        next()

     } catch (error) {
        console.log(error)
        resp.status(401).json({
            msg: 'Token no valido'
        })
        
     }
    
}


module.exports = {
    validateJWT
}