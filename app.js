const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
require('./crons/cleanupForgottenCarts');

const app = express();

// Conectar a la base de datos
connectDB();

// Middleware
app.use(bodyParser.json());

// Definir rutas
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/carts', require('./routes/cartRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

module.exports = app;

