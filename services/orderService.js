const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class OrderService {
  constructor() {}

  async create(data) {
    const newOrder = await models.Order.create(data);
    return newOrder;
  }

  async find() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(
          models.Order.findAll({
            include: ['customer', 'items'],
          })
        );
      }, 3000);
    });
  }

  async findOne(id) {
    const order = await models.Order.findByPk(id, {
      include: [
        {
          association: 'customer',
          include: ['user'],
        },
        'items',
      ],
    });
    if (!order) {
      throw boom.notFound('Order not found');
    }
    return order;
  }

  async update(id, changes) {
    const order = await this.finOne(id);
    if (!order) {
      throw boom.notFound('Order not found');
    }
    const updatedOrder = await models.update(changes);
    return updatedOrder;
  }

  async delete(id) {
    const order = await this.finOne(id);
    if (!order) {
      throw boom.notFound('Order not found');
    }
    await models.Order.destroy();
    return { id };
  }

  async addItem(data) {
    const newItem = await models.OrderProduct.create(data);
    return newItem;
  }
}

module.exports = OrderService;
