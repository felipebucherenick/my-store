const express = require('express');
const UserService = require('../services/userService');
const validatorHandler = require('../middlewares/validatorHandler');
const {
  createUserSchema,
  findUserSchema,
  updateUserSchema,
} = require('../schemas/userSchema');

const router = express.Router();

const service = new UserService();

router.post(
  '/',
  validatorHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newUser = await service.create(body);
      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  }
);

router.get('/', async (req, res, next) => {
  try {
    const users = await service.find();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
