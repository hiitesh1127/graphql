const Joi = require('joi')

const userRegisterSchema = Joi.object({
    name: Joi.string().required(),
    username : Joi.string().lowercase().alphanum().min(4).max(12).required(),
    email : Joi.string().email().lowercase().required(),
    password : Joi.string().min(4).required(),
    //confirmPassword: Joi.any().valid(Joi.ref('password')).required().options({ language: { any: { allowOnly: 'must match password' } } });
})

const userLoginSchema = Joi.object({
    username : Joi.string().alphanum().min(4).max(12).required(),
    password : Joi.string().min(4).required(),
})

export {userRegisterSchema, userLoginSchema}