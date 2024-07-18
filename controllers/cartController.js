const Cart = require('../models/Cart');

// Crear un nuevo carrito
exports.createCart = async (req, res) => {
  try {
    const cart = new Cart();
    await cart.save();
    res.status(200).json({ id: cart._id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener detalles de un carrito
exports.getCart = async (req, res) => {
  try {
    const { cartId } = req.params;
    const cart = await Cart.findById(cartId).populate('products._id', 'name price');
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Agregar un producto al carrito
exports.addProductToCart = async (req, res) => {
  try {
    const { cartId } = req.params;
    const { productId, quantity } = req.body;

    const cart = await Cart.findById(cartId);
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    // Check if the product already exists in the cart
    const existingProductIndex = cart.products.findIndex(p => p.productId.equals(productId));

    if (existingProductIndex !== -1) {
      // Product already exists, update quantity
      cart.products[existingProductIndex].quantity += quantity;
    } else {
      // Product does not exist, add new product
      cart.products.push({ product: productId, quantity });
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un producto del carrito
exports.removeProductFromCart = async (req, res) => {
  try {
    const { cartId, productId } = req.params;

    const cart = await Cart.findById(cartId);
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    // Filter out the product to be removed
    cart.products = cart.products.filter(p => !p.product.equals(productId));

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
