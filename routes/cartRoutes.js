const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Crear un nuevo carrito
router.post('/', cartController.createCart);

// Obtener detalles de un carrito
router.get('/:cartId', cartController.getCart);

// Agregar un producto al carrito
router.put('/:cartId/product', cartController.addProductToCart);

// Eliminar un producto del carrito
router.delete('/:cartId/product/:productId', cartController.removeProductFromCart);

module.exports = router;
