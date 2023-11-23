const express = require('express');
const {
    getTransactionTypes,
    getTransactionStatuses,
    getTransactions,
    getTransactionById,
    createTransaction,
    updateTransaction,
    deleteTransaction
} = require('../controllers/transactionController');
const { protect } = require('../middlewares/authMiddleware');


const router = express.Router();

// @desc    Get transaction types
// @route   GET /api/transactions/types
// @access  Private
router.get('/types', protect, getTransactionTypes);

// @desc    Get transaction statuses
// @route   GET /api/transactions/statuses
// @access  Private
router.get('/statuses', protect, getTransactionStatuses);

// @desc    Get transactions
// @route   GET /api/transactions
// @access  Private
router.get('/', protect, getTransactions);

// @desc    Get transaction by id
// @route   GET /api/transactions/:id
// @access  Private
router.get('/:id', protect, getTransactionById);

// @desc    Create transaction
// @route   POST /api/transactions
// @access  Private
router.post('/', protect, createTransaction);

// @desc    Update transaction
// @route   PUT /api/transactions/:id
// @access  Private
router.put('/:id', protect, updateTransaction);

// @desc    Delete transaction
// @route   DELETE /api/transactions/:id
// @access  Private
router.delete('/:id', protect, deleteTransaction);


module.exports = router;