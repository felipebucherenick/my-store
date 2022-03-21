'use strict';
const { ORDER_TABLE } = require('../models/orderModel');
const { DataTypes, Sequelize } = require('sequelize');
const { CUSTOMER_TABLE } = require('../models/customerModel');

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(ORDER_TABLE, {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
      },
      customerId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'customer_id',
        references: {
          model: CUSTOMER_TABLE,
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      createdAt: {
        allowNull: false,
        field: 'created_at',
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        allowNull: false,
        field: 'updated_at',
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable(ORDER_TABLE);
  },
};
