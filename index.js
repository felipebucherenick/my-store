const express = require('express');
const app = express();
const port = 3005;

app.get('/', (req, res) => {
  res.send('Hello Server 3005 working');
});

app.get('/json', (req, res) => {
  res.json({ name: 'apple', price: 350 });
});

app.listen(port, () => {
  console.log(`My port: ${port}`);
});
