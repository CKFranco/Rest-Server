const { response, request } = require('express')

const isAdminRole = (req = request, res = response ,  next) => {

    if(!req.authUser){
        return res.status(500).json({
            msg: 'Aun no se cuenta con token válida'
        })
    }

    const {role, nombre} = req.authUser

    if(role !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg: `${nombre} no tiene privilegios para eliminar usuarios`
        })
    }

    next()

}

const isValidRoles = (...roles) => {

    return (req, res = response, next) => {

        if(!req.authUser){
            return res.status(500).json({
                msg: 'Aun no se cuenta con token válida'
            })
        }

        const {role} = req.authUser 

        if( !roles.includes(role) ){
            return res.status(401).json({
                msg: 'Usuario no cuenta con privilegios para realizar esta acción'
            })
        }


        next()
    }

}

module.exports = {
    isAdminRole,
    isValidRoles
}