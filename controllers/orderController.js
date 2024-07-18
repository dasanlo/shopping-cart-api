const Order = require('../models/Order');
const Cart = require('../models/Cart');

// Crear una orden desde un carrito
exports.createOrder = async (req, res) => {
  try {
    const { cartId } = req.body;

    const cart = await Cart.findById(cartId);
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    // Calculate total price based on products in the cart
    let totalPrice = 0;
    for (const item of cart.products) {
      const product = await Product.findById(item.productId);
      if (product) {
        totalPrice += product.price * item.quantity;
      }
    }

    const order = new Order({ cart: cartId, total: totalPrice });
    await order.save();

    // Optionally, clear the cart after creating the order
    // await cart.updateOne({ products: [] });

    res.status(200).json({ id: order._id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener detalles de una orden
exports.getOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId).populate('cart');
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
