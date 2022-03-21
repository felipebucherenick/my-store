const joi = require('joi');

const id = joi.number().integer();
const firstName = joi.string().min(3).max(15);
const lastName = joi.string().min(3).max(20);
const phone = joi.string().min(8).max(10);
const address = joi.string().min(5).max(30);
const userId = joi.number().integer();

const createCustomerSchema = joi.object({
  firstName: firstName.required(),
  lastName: lastName.required(),
  phone: phone.required(),
  address: address.required(),
  userId: userId.required(),
});

const findCustomerSchema = joi.object({
  id: id.required(),
});

const updateCustomerSchema = joi.object({
  firstName: firstName,
  lastName: lastName,
  phone: phone,
  address: address,
  userId: userId,
});

module.exports = {
  createCustomerSchema,
  findCustomerSchema,
  updateCustomerSchema,
};
