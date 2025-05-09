const Joi = require('joi');

const userSchema = Joi.object({
    name: Joi.string().required().min(3),
    email: Joi.string().email().required(),
});

const registerSchema = Joi.object({
    name: Joi.string().required().min(3),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6),
   
}).unknown(true); // Allow additional fields like profile_image

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

const validateUser = (req, res, next) => {
    const { error } = userSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};

const validateRegister = (req, res, next) => {
    const { error } = registerSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};

const validateLogin = (req, res, next) => {
    const { error } = loginSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};

module.exports = {
    validateUser,
    validateRegister,
    validateLogin
};
