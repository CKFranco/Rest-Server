const Role = require('../models/role')

const User = require('../models/usuario')




const isValidRole = async (role = '' ) => {
    const roleExist = await Role.findOne({role})
    if(!roleExist){
        throw new Error( `El rol ${role} no existe en la base de datos`)
    }
}


const isEmailRegistered = async ( correo = '' ) => {
    const emailExist = await User.findOne({correo})
    if(emailExist){

        throw new Error( `El email ${correo} ya esta registrado`)
        // return res.status(400).json({
        //     msg: `El email ${correo} ya esta registrado`
        // })
    }
}

const existUserWhithId =  async ( id ) => {
    const isUserWhithId = await User.findById(id)
    if(!isUserWhithId){
        throw new Error( `El usuario con id: ${id}, no existe en la base de datos`)
    }
}

module.exports = {
    isValidRole,
    isEmailRegistered,
    existUserWhithId
}