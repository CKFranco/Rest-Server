const {Router} = require('express')
const { check } = require('express-validator')


const { usersGet, usersPut, usersPost, usersDelete, usersPatch } = require('../controllers/usuarios.controllers')
const { isValidRole, isEmailRegistered, existUserWhithId } = require('../helpers/db-validators')

const {isAdminRole, isValidRoles, validateFields, validateJWT} = require('../middlewares')



const router = Router()

router.get('/', usersGet)

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('correo', 'El correo no es válido').isEmail(),
    check('correo').custom( isEmailRegistered),
    check('password', 'Contraseña debe incluir mas de 6 caracteres').isLength({min: 6}),
    // check('role', 'El rol ingresado no existe').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom( isValidRole ),
    validateFields
], usersPost)

router.put('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existUserWhithId ),
    check('role').custom( isValidRole ),
    validateFields
], usersPut)

router.patch('/', usersPatch)

router.delete('/:id',[
    validateJWT,
    //isAdminRole,
    isValidRoles( "ADMIN_ROLE", "SALES_ROLE" ), 
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existUserWhithId ),
    validateFields
], usersDelete)


module.exports = router