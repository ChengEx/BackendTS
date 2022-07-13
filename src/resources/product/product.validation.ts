import Joi from 'joi';

const addProduct = Joi.object({
    name: Joi.string().max(10).required(),
    category: Joi.string().required(),
    images: Joi.array().max(5).required(),
    description: Joi.string().max(300).required(),
    price: Joi.number().required(),
    status: Joi.string().required()
});

export default { addProduct };