const Joi = require('joi');

module.exports = Joi.object().keys({
    name: Joi.string().trim().alphanum().min(2).max(30).optional(),
    age: Joi.number().integer().min(18).max(85).optional(),
})
