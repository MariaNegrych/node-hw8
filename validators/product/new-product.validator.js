const Joi = require('joi')

module.exports = Joi.object().keys({
    name: Joi.string().trim().alphanum().min(3).max(50).required(),
    power: Joi.number().integer().required(),
    price: Joi.number().integer().required(),
    year: Joi.number().integer().min(2000).max(2020).required(),
    promo: Joi.string().trim().min(10).max(15).required(),
})
