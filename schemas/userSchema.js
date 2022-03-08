const joi = require('joi');

const id = joi.number().integer();
const email = joi.string().email();
const password = joi.string().min(8).max(15);
const role = joi.string().min(3).max(10);

const createUserSchema = joi.object({
  email: email.required(),
  password: password.required(),
  role: role,
});

const findUserSchema = joi.object({
  id: id.required(),
});

const updateUserSchema = joi.object({
  email: email,
  password: password,
});

module.exports = {
  createUserSchema,
  findUserSchema,
  updateUserSchema,
};
