const express = require('express');
const {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
} = require('../controllers/categoryControllers');
const { protect } = require('../middlewares/authMiddleware');


const router = express.Router();

// @desc    Get all categories
// @route   GET /api/categories
// @access  Private
router.get('/', protect, getAllCategories);

// @desc    Get category by id
// @route   GET /api/categories/:id
// @access  Private
router.get('/:id', protect, getCategoryById);

// @desc    Create new category
// @route   POST /api/categories
// @access  Private
router.post('/', protect, createCategory);

// @desc    Update category
// @route   PUT /api/categories/:id
// @access  Private
router.put('/:id', protect, updateCategory);

// @desc    Delete category
// @route   DELETE /api/categories/:id
// @access  Private
router.delete('/:id', protect, deleteCategory);

module.exports = router;