const express = require("express");
const {
  getCart,
  addToCart,
  removeFromCart,
  updateCartItem,
  clearCart,
} = require("../controllers/cartController");
const { authMiddleware } = require("../middleware/auth");

const router = express.Router();

// All cart routes are protected
router.get("/", authMiddleware, getCart);
router.post("/add", authMiddleware, addToCart);
router.post("/remove", authMiddleware, removeFromCart);
router.post("/update", authMiddleware, updateCartItem);
router.post("/clear", authMiddleware, clearCart);

module.exports = router;
