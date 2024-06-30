const express = require('express');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/products');
const sequelize = require('./config/database');
const Product = require('./models/product');

const app = express();

app.use(bodyParser.json());
app.use('/products', productRoutes);

// Sync database and start the server
sequelize.sync().then(() => {
  console.log('Database synced');
}).catch(err => {
  console.error('Failed to sync database:', err);
});

module.exports = app;

app.use((err, req, res, next) => {
    res.status(500).json({ error: err.message });
  });
  