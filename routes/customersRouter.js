const express = require('express');
const CustomerService = require('../services/customerService');
const validatorHandler = require('../middlewares/validatorHandler');
const {
  createCustomerSchema,
  findCustomerSchema,
  updateCustomerSchema,
} = require('../schemas/costumerSchema');

const router = express.Router();
const service = new CustomerService();

router.post(
  '/',
  validatorHandler(createCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newCustomer = await service.create(body);
      res.status(201).json(newCustomer);
    } catch (error) {
      next(error);
    }
  }
);

router.get('/', async (req, res, next) => {
  try {
    const customers = await service.find();
    res.status(200).json(customers);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validatorHandler(findCustomerSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const customer = await service.findOne(id);
      res.status(200).json(customer);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/:id',
  validatorHandler(findCustomerSchema, 'params'),
  validatorHandler(updateCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const updatedCustomer = await service.update(id, body);
      res.status(201).json(updatedCustomer);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  validatorHandler(findCustomerSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const customerId = await service.delete(id);
      res.status(201).json(customerId);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
