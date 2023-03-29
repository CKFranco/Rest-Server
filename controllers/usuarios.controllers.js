const {response, request} = require('express')
const User = require('../models/usuario')
const bcryptjs = require('bcryptjs')


const usersGet = async (req = request, res = response) => {

    // const {name, lastName, apiKey, id} = req.query
    const { limit = 5, skip = 5} = req.query
    const stateQuery = {estado: true}
    
    const [users, totalUser] = await Promise.all([
        User.find(stateQuery).limit(Number(limit)).skip(Number(skip)),
        User.countDocuments(stateQuery)
    ])

    res.json({
        msg: `Total de usuarios: ${totalUser}, Usuarios mostrados ${users.length}`,
        users
        // users
    })
}

const usersPost = async(req, res = response) => {

    const {nombre, correo, password, role} = req.body

    const user = new User({nombre, correo, password, role})

    //ENCRIPTAR LA CONTRASEÑA
    const salt = bcryptjs.genSaltSync()
    user.password = bcryptjs.hashSync(password, salt)

    //GUARDAR
    await user.save()

    res.status(201).json({
        msg: 'Usuario creado correctamente',
        user
    })
}

const usersPut = async (req, res = response) => {

    const {id} = req.params
    const {_id, password, google, ...resto} = req.body 

    // todo: validar contra base de datos
    if(password){

        //ENCRIPTAR LA CONTRASEÑA
        const salt = bcryptjs.genSaltSync()
        resto.password = bcryptjs.hashSync(password, salt)

    }

    const user = await User.findByIdAndUpdate(id, resto)

    res.json({
        msg: 'Usuario actualizado correctamente',
        user
    })
}

const usersPatch = (req, res = response) => {
    res.json({
        msg: 'peticion Patch API - from controller'
    })
}

const usersDelete = async (req, res = response) => {

    const {id} = req.params

    const uid = req.uid

    // Para eliminar registros no recomendado
    // const deleteUser = await User.findByIdAndDelete(id)

    const authentcatedUser = req.authUser

    const disabledUser = await User.findByIdAndUpdate(id, {estado: false})

    res.json({
        msg: 'Usuario eliminado correctamente',
        authentcatedUser,
        disabledUser,
        uid
    })
}

module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersPatch,
    usersDelete
}

