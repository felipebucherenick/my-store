const faker = require('faker');
const boom = require('@hapi/boom');
const sequelize = require('../libs/sequelize');
const { models } = require('../libs/sequelize');

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
    const newUser = await models.User.create(data);
    return newUser;
  }

  async find() {
    const data = await models.User.findAll();
    return data;
  }

  async findOne(id) {
    const user = await models.User.findByPk(id);
    if (!user) {
      throw boom.notFound('User not found');
    }
    return user;
  }

  async update(id, changes) {
    const user = await this.findOne(id);
    const updatedUser = await user.update(changes);
    return updatedUser;
  }

  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy();
    return { id };
  }
}

module.exports = UserService;
