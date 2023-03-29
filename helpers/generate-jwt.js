const jwt = require('jsonwebtoken')


const generateJWT = (uid = '') => {

        return new Promise( (resolve, reject) => {

            const payload = {uid}

            jwt.sign( payload, process.env.GENERATEJWT, {expiresIn: '4h'}, (err, token) => {
                if(err){
                    console.log(err)
                    reject('Token no pudo ser generado')
                }else{
                    resolve(token)
                }
            })

        } )
}

module.exports = {
    generateJWT
}