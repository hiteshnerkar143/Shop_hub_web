const express = require("express");
const {
  signup,
  verifySignupOTP,
  login,
  verifyLoginOTP,
  resendOTP,
} = require("../controllers/authController");

const router = express.Router();

// Auth routes
router.post("/signup", signup);
router.post("/verify-signup", verifySignupOTP);
router.post("/login", login);
router.post("/verify-login", verifyLoginOTP);
router.post("/resend-otp", resendOTP);

module.exports = router;
