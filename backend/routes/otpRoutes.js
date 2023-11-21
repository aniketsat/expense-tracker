const express = require('express');
const { sendOTP, verifyOTP } = require('../controllers/otpControllers');


const router = express.Router();

// @desc    Send OTP
// @route   POST /api/users/send-otp
// @access  Public
router.post('/send-otp', sendOTP);

// @desc    Verify OTP
// @route   POST /api/users/verify-otp
// @access  Public
router.post('/verify-otp', verifyOTP);


module.exports = router;