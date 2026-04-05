const express = require("express");
const { processPayment } = require("../controllers/paymentController");
const { authMiddleware } = require("../middleware/auth");

const router = express.Router();

// Process Payment (Fake/Demo)
router.post("/process-payment", authMiddleware, processPayment);

module.exports = router;
