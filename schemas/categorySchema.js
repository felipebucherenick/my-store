const joi = require('joi');

const id = joi.string().uuid();
const name = joi.string().min(3).max(15);
const image = joi.string();

const createCategorySchema = joi.object({
  name: name.required(),
  image: image.required(),
});

const findCategorySchema = joi.object({
  id: id.required(),
});

const updateCategorySchema = joi.object({
  name: name,
  image: image,
});

module.exports = {
  createCategorySchema,
  findCategorySchema,
  updateCategorySchema,
};
