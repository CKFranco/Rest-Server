const validaCampos = require('../middlewares/fieldsValidation')
const validaToken = require('../middlewares/validateJwt')
const validaRoles = require('../middlewares/validateRole')

module.exports = {
    ...validaCampos,
    ...validaToken,
    ...validaRoles,
}