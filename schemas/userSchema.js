const joi = require('joi');

const id = joi.string().uuid();
const name = joi.string().min(3).max(30);
const email = joi.string().email();
const password = joi.string().min(8).max(15);
const address = joi.string().min(5).max(30);
const phone = joi.string().alphanum().min(6).max(12);
const role = joi.string().min(3).max(10);

const createUserSchema = joi.object({
  name: name.required(),
  email: email.required(),
  password: password.required(),
  address: address.required(),
  phone: phone.required(),
  role: role,
});

const findUserSchema = joi.object({
  id: id.required(),
});

const updateUserSchema = joi.object({
  name: name,
  email: email,
  password: password,
  address: address,
  phone: phone,
});

module.exports = {
  createUserSchema,
  findUserSchema,
  updateUserSchema,
};
