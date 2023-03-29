const {Router} = require('express')
const { check } = require('express-validator')
const { login } = require('../controllers/auth.controller')
const { validateFields } = require('../middlewares/fieldsValidation')



const router = Router()

//todo - Segundo se crea ruta previamente agregada en el server
router.post('/login', [

    //todo - Cuarto se agregan validaciones de las request para que los errores no revienten la DB
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validateFields

], login)


module.exports = router