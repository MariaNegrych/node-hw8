const Joi = require('joi')

const {regexpEnum} = require('../../constants')

module.exports = Joi.object().keys({
    name: Joi.string().trim().alphanum().min(2).max(30).required(),
    age: Joi.number().integer().min(18).max(85).required(),
    email: Joi.string().regex(regexpEnum.EMAIL).required(),
    password: Joi.string().trim().min(8).required()
})
