const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Crear un nuevo producto
router.post('/', productController.createProduct);

// Obtener detalles de un producto
router.get('/:productId', productController.getProduct);

module.exports = router;
