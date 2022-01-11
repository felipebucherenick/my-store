const express = require('express');

const productsRouter = require('./productsRouter');
const clientsRouter = require('./clientsRouter');

const {
  logErrors,
  errorHandler,
  boomErrorHandler,
} = require('../middlewares/errorHandler');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/products', productsRouter);
  router.use('/clients', clientsRouter);
  app.use(logErrors);
  app.use(boomErrorHandler);
  app.use(errorHandler);
}

module.exports = routerApi;
