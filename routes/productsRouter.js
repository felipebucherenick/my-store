const express = require('express');
const ProductsService = require('../services/productsService');

const router = express.Router();

const service = new ProductsService();

router.get('/', (req, res) => {
  const products = service.find();
  res.status(200).json(products);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const product = service.findOne(id);
  res.status(200).json(product);
});

router.post('/', (req, res) => {
  const body = req.body;
  const newProduct = service.create(body);
  res.status(201).json(newProduct);
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const updatedProduct = service.update(id, body);
  res.status(200).json(updatedProduct);
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const delProduct = service.delete(id);
  res.status(200).json(delProduct);
});

module.exports = router;
