const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": `"name" is a required field`,
  }),
  email: Joi.string().email().required().messages({
    "any.required": `"email" is a required field`,
    "string.email": `"email" must be a valid email`,
  }),
  phone: Joi.string()
    .pattern(/^\(\d{3}\) \d{3}-\d{4}-\d{3}$/)
    .required()
    .messages({
      "any.required": `"phone" is a required field`,
      "string.pattern.base": `"phone" must be in the format (XXX) XXX-XXXX-XXX`,
    }),
  favorite: Joi.boolean().required().messages({
    "any.required": `"favorite" is a required field`,
    "boolean.base": `"favorite" must be a boolean`,
  }),
});

module.exports = contactSchema;
