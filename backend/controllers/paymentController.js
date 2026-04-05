const Cart = require("../models/Cart");
const Product = require("../models/Product");

// Fake Payment Processing - Simulated Order Creation
exports.processPayment = async (req, res) => {
  try {
    const userId = req.userId;
    const { items, totalPrice, shippingInfo } = req.body;

    if (!items || !totalPrice || !shippingInfo) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    // Verify all products exist and have sufficient stock
    for (let item of items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Product ${item.productId} not found`,
        });
      }
      if (product.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for ${product.name}`,
        });
      }
    }

    // Reduce product stock
    for (let item of items) {
      await Product.findByIdAndUpdate(
        item.productId,
        { $inc: { stock: -item.quantity } },
        { new: true }
      );
    }

    // Clear cart
    await Cart.findOneAndUpdate({ userId }, { items: [], totalPrice: 0 });

    // Generate fake order ID
    const orderId = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    res.json({
      success: true,
      message: "Payment processed successfully (Demo)",
      orderId: orderId,
      totalPrice: totalPrice,
      shippingInfo: shippingInfo,
    });
  } catch (error) {
    console.error("Payment processing error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
