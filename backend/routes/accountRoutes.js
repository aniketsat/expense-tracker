const express = require('express');
const { getAccountTypes, createAccount, getAccounts, getAccountById, updateAccount, deleteAccount } = require('../controllers/accountController');
const { protect } = require('../middlewares/authMiddleware');


const router = express.Router();

// @desc    Get all account types
// @route   GET /api/accounts/types
// @access  Private
router.get('/types', protect, getAccountTypes);

// @desc    Create a new account
// @route   POST /api/accounts
// @access  Private
router.post('/', protect, createAccount);

// @desc    Get all accounts
// @route   GET /api/accounts
// @access  Private
router.get('/', protect, getAccounts);

// @desc    Get an account by id
// @route   GET /api/accounts/:id
// @access  Private
router.get('/:id', protect, getAccountById);

// @desc    Update an account
// @route   PUT /api/accounts/:id
// @access  Private
router.put('/:id', protect, updateAccount);

// @desc    Delete an account
// @route   DELETE /api/accounts/:id
// @access  Private
router.delete('/:id', protect, deleteAccount);


module.exports = router;