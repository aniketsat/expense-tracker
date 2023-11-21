const express = require('express');

const router = express.Router();

const {
    getUserProfile,
} = require('../controllers/userControllers');
const { protect } = require('../middlewares/authMiddleware');


// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
router.get('/profile', protect, getUserProfile);

// @desc    Update user profile

module.exports = router;