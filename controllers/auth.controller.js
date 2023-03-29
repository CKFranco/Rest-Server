const { response } = require("express");
const bcryptjs = require('bcryptjs')

const User = require('../models/usuario');
const { generateJWT } = require("../helpers/generate-jwt");




//todo - Tercero se crea controlador para la ruta 

const login = async (req, res = response ) => {

    const { correo, password } = req.body

    try {

        // Verificar si el email existe
        const existUser = await User.findOne({correo})

        if(!existUser){
            return res.status(400).json({
                msg: 'El correo o contraseña son incorrectos (email)'
            })
        }

        //Verificar si el usuario esta activo
        if(!existUser.estado){
            return res.status(400).json({
                msg: 'El correo o contraseña son incorrectos (estado: false)'
            })
        }

        // Verificar la contraseña
                            // todo esta fucion retorna boolean
        const validPassword = bcryptjs.compareSync(password, existUser.password)

        if(!validPassword){
            return res.status(400).json({
                msg: 'El correo o la contraseña son incorrectos (password)'
            })
        }

        // Generar el JWT
        const token = await generateJWT( existUser._id)

        res.json({
            msg: 'Login ok',
            existUser,
            token
        })
        
    } catch (error) {

        console.log(error)
        return res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}

module.exports = {
    login
}