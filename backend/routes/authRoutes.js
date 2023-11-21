const express = require('express');
const {
    login,
    register,
    logout,
    refreshToken,
} = require('../controllers/authControllers');
const { protect } = require('../middlewares/authMiddleware');


const router = express.Router();

// @desc    Login user
// @route   POST /api/users/login
// @access  Public
router.post('/login', login);

// @desc    Register user
// @route   POST /api/users/register
// @access  Public
router.post('/register', register);

// @desc    Logout user
// @route   POST /api/users/logout
// @access  Private
router.post('/logout', protect, logout);

// @desc    Get new access token
// @route   POST /api/users/refresh-token
// @access  Public
router.post('/refresh-token', refreshToken);


module.exports = router;