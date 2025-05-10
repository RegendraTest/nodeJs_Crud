const Joi = require('joi');

const productSchema = Joi.object({
    name: Joi.string().required().min(3),
    description: Joi.string().allow('', null),
    price: Joi.number().required().min(0),
    stock: Joi.number().integer().min(0).default(0)
}).unknown(true); // Allow additional fields like image

const validateProduct = (req, res, next) => {
    const { error } = productSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};

module.exports = {
    validateProduct
};
