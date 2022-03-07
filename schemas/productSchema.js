const joi = require('joi');

const id = joi.string().uuid();
const name = joi.string().min(3).max(15);
const description = joi.string().max(50);
const img = joi.string();
const price = joi.number().integer().min(10);
const category = joi.string().min(3).max(15);

const createProductSchema = joi.object({
  name: name.required(),
  description: description.required(),
  img: img,
  price: price.required(),
  category: category,
});

const findProductSchema = joi.object({
  id: id.required(),
});

const updateProductSchema = joi.object({
  name: name,
  description: description,
  img: img,
  price: price,
  category: category,
});

module.exports = {
  createProductSchema,
  findProductSchema,
  updateProductSchema,
};
