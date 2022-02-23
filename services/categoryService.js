const faker = require('faker');
const { boom } = require('@hapi/boom');

class CategoryService {
  constructor() {
    this.categories = [];
    this.generate();
  }

  generate() {
    const limit = 5;
    for (let i = 0; i < limit; i++) {
      this.categories.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        image: faker.image.imageUrl(),
      });
    }
  }

  async create(data) {
    const newCategory = {
      id: faker.datatype.uuid(),
      ...data,
    };
    this.categories.push(newCategory);
    return newCategory;
  }

  async find() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.categories);
      }, 3000);
    });
  }

  async findOne(id) {
    const category = this.categories.find((category) => id === category.id);
    if (!category) {
      throw boom.notFound('Category not found');
    }
    return category;
  }

  async update(id, changes) {
    const index = this.categories.findIndex((category) => id === category.id);
    if (index === -1) {
      throw boom.notFound('Category not found');
    }
    const category = this.categories[index];
    this.categories[index] = {
      ...category,
      ...changes,
    };
    return this.categories[index];
  }

  async delete(id) {
    const index = this.categories.findIndex((category) => id === category.id);
    if (index === -1) {
      throw boom.notFound('Category not found');
    }
    const deletedCategory = this.categories[index];
    this.categories.splice(index, 1);
    return deletedCategory;
  }
}

module.exports = CategoryService;
