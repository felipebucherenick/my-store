const boom = require('@hapi/boom');
const bcript = require('bcrypt');
const { models } = require('../libs/sequelize');

class UserService {
  constructor() {}

  async create(data) {
    const hash = await bcript.hash(data.password, 10);
    const newUser = await models.User.create({
      ...data,
      password: hash,
    });
    delete newUser.dataValues.password;
    return newUser;
  }

  async find() {
    const customers = await models.User.findAll({
      include: ['customer'],
    });
    return customers;
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
    if (!user) {
      throw boom.notFound('User not found');
    }
    const updatedUser = await user.update(changes);
    return updatedUser;
  }

  async delete(id) {
    const user = await this.findOne(id);
    if (!user) {
      throw boom.notFound('User not found');
    }
    await user.destroy();
    return { id };
  }
}

module.exports = UserService;
