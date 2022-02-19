const joi = require('joi');

const id = joi.string().uuid();
const name = joi.string().alphanum().min(3).max(15);
const price = joi.number().integer().min(10);
const img = joi.string();
const isBlock = joi.boolean();

const createProductSchema = joi.object({
  name: name.required(),
  price: price.required(),
  img: img,
  isBlock: isBlock.required(),
});

const findProductSchema = joi.object({
  id: id.required(),
});

const updateProductSchema = joi.object({
  name: name,
  price: price,
  isBlock: isBlock,
});

module.exports = {
  createProductSchema,
  findProductSchema,
  updateProductSchema,
};
