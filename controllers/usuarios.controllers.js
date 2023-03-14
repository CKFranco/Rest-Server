const {response, request} = require('express')

const usersGet = (req = request, res = response) => {

    const {name, lastName, apiKey, id, page = 1, limit = 'no limit'} = req.query

    res.json({
        msg: 'peticion Get API - from controller',
        name,
        lastName,
        id,
        page,
        limit
    })
}

const usersPost = (req, res = response) => {

    const {nombre, edad} = req.body

    res.status(201).json({

        msg: 'peticion Post API - from controller',
        nombre,
        edad

    })
}

const usersPut = (req, res = response) => {

    const {id} = req.params

    res.json({
        msg: 'peticion Put API - from controller',
        id
    })
}

const usersPatch = (req, res = response) => {
    res.json({
        msg: 'peticion Patch API - from controller'
    })
}

const usersDelete = (req, res = response) => {
    res.json({
        msg: 'peticion Delete API - from controller'
    })
}

module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersPatch,
    usersDelete
}

