import Joi from 'joi';

const register = Joi.object({
    username: Joi.string().max(30).required(),
    password: Joi.string().min(6).required(),
    name: Joi.string().max(30).required(),
    email: Joi.string().email().required(),
    gender: Joi.string().required(),
    phone: Joi.string().min(6).max(30).required()
});

const login = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
});

const getPersonalInformation = Joi.object({
    _id: Joi.string().required()
})
export default { register, login, getPersonalInformation };