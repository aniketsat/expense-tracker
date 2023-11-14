const express = require('express');

const router = express.Router();

const {
    login,
    register,
    logout,
    refreshToken,
    getUserProfile
} = require('../controllers/userControllers');
const { protect } = require('../middlewares/authMiddleware');

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

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
router.get('/profile', protect, getUserProfile);

module.exports = router;