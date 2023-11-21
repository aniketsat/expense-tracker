const express = require('express');
const {
    getUserProfile,
    updateUserProfile,
    updatePassword,
} = require('../controllers/userControllers');
const { protect } = require('../middlewares/authMiddleware');


const router = express.Router();

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
router.get('/profile', protect, getUserProfile);

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
router.put('/profile', protect, updateUserProfile);

// @desc    Update user password
// @route   PUT /api/users/password
// @access  Private
router.put('/password', protect, updatePassword);


module.exports = router;