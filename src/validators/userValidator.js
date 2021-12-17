const joi = require('joi')

const createAccount = joi.object().keys(
    {
        userName: joi.string().required(),
        email: joi.string().email().max(256).required(),
        password: joi.string().min(7).required(),
        dob: joi.date(),
        gender: joi.string().valid('male', 'female')
    }
)

module.exports = { createAccount }