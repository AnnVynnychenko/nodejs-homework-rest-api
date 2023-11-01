const Joi = require("joi");

const registerSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().email().required(),
  subscription: Joi.string().required(),
});

const emailSchema = Joi.object({
  email: Joi.string().email().required(),
});

const loginSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().email().required(),
});

const updateSubscriptionSchema = Joi.object({
  subscription: Joi.string().required(),
});

const schemas = {
  registerSchema,
  emailSchema,
  loginSchema,
  updateSubscriptionSchema,
};

module.exports = schemas;
