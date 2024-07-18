const Product = require('../models/Product');

// Crear un nuevo producto
exports.createProduct = async (req, res) => {
  try {
    const { name, price, stock } = req.body;
    const product = new Product({ name, price, stock });
    await product.save();
    res.status(200).json({ id: product._id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener detalles de un producto
exports.getProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
