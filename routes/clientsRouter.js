const express = require('express');
const faker = require('faker');

const router = express.Router();

router.get('/', (req, res) => {
  const { size } = req.query;
  const limit = size || 10;
  const clients = [];
  for (let i = 0; i < limit; i++) {
    clients.push({
      firtName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      avatar: faker.image.avatar(),
    });
  }
  res.json(clients);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  if (id === '999') {
    res.status(404).json({ message: 'not found' });
  } else {
    res.status(200).json({
      id: id,
      name: 'pen',
      price: 234,
    });
  }
});

module.exports = router;
