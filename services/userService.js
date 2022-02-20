const faker = require('faker');
/* const boom = require('@hapi/boom'); */

function createPhoneNumber() {
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  const phoneNumber = [];
  for (let i = 0; i < 8; i++) {
    phoneNumber.push(getRandomInt(0, 9));
  }
  return phoneNumber.toString().replaceAll(',', '');
}

class UserService {
  constructor() {
    this.products = [];
    this.generate();
  }

  generate() {
    const limit = 100;
    for (let i = 0; i < limit; i++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.name.firstName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        address: faker.address.streetAddress(),
        phone: createPhoneNumber(),
        role: faker.lorem.words(1),
      });
    }
  }

  async create(data) {
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  async find() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.products);
      }, 3000);
    });
  }
}

module.exports = UserService;
