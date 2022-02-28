const faker = require('faker');
const boom = require('@hapi/boom');
const sequelize = require('../libs/sequelize');

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
    this.users = [];
    this.generate();
  }

  generate() {
    const limit = 100;
    for (let i = 0; i < limit; i++) {
      this.users.push({
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
    const newUser = {
      id: faker.datatype.uuid(),
      ...data,
    };
    this.products.push(newUser);
    return newUser;
  }

  async find() {
    const [data] = await sequelize.query('SELECT * FROM tasks');
    return data;
  }

  async findOne(id) {
    const user = this.users.find((user) => id === user.id);
    if (!user) {
      throw boom.notFound('User not found');
    }
    return user;
  }

  async update(id, changes) {
    const index = this.users.findIndex((user) => id === user.id);
    if (index === -1) {
      throw boom.notFound('User not found');
    }
    const user = this.users[index];
    this.users[index] = {
      ...user,
      ...changes,
    };
    return this.users[index];
  }

  async delete(id) {
    const index = this.users.findIndex((user) => id === user.id);
    if (index === -1) {
      throw boom.notFound('User not fund');
    }
    const deletedUser = this.users[index];
    this.users.splice(index, 1);
    return deletedUser;
  }
}

module.exports = UserService;
