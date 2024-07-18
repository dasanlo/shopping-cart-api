const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Crear una orden desde un carrito
router.post('/', orderController.createOrder);

// Obtener detalles de una orden
router.get('/:orderId', orderController.getOrder);

module.exports = router;
