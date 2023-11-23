const asyncHandler = require('express-async-handler');
const Transaction = require('../models/transactionModel');


const getTransactionTypes = asyncHandler(async (req, res) => {
    const types = Transaction.schema.path('type').enumValues;
    res.json({
        message: 'Transaction types fetched successfully',
        types
    });
});

const getTransactionStatuses = asyncHandler(async (req, res) => {
    const statuses = Transaction.schema.path('status').enumValues;
    res.json({
        message: 'Transaction statuses fetched successfully',
        statuses
    });
});

const getTransactions = asyncHandler(async (req, res) => {
    // Get user id from req.user
    const userId = req.user._id;

    // Get transactions from db
    const transactions = await Transaction.find({ user: userId });

    // Send response
    res.json({
        message: 'Transactions fetched successfully',
        transactions
    });
});

const getTransactionById = asyncHandler(async (req, res) => {
    // Get user id from req.user
    const userId = req.user._id;

    // Get transaction id from req.params
    const transactionId = req.params.id;

    // Get transaction from db
    const transaction = await Transaction.findOne({ _id: transactionId, user: userId });
    if (!transaction) {
        res.status(404);
        throw new Error('Transaction not found');
    }

    // Send response
    res.json({
        message: 'Transaction fetched successfully',
        transaction
    });
});

const createTransaction = asyncHandler(async (req, res) => {
    // Get user id from req.user
    const userId = req.user._id;

    // Get transaction data from req.body
    const { account, categories, amount, title, description, date, type, status } = req.body;

    // Create transaction
    const transaction = await Transaction.create({
        user: userId,
        account,
        categories,
        amount,
        title,
        description,
        date,
        type,
        status
    });
    if (!transaction) {
        res.status(400);
        throw new Error('Invalid transaction data');
    }

    // Send response
    res.status(201).json({
        message: 'Transaction created successfully',
        transaction
    });
});

const updateTransaction = asyncHandler(async (req, res) => {
    // Get user id from req.user
    const userId = req.user._id;

    // Get transaction id from req.params
    const transactionId = req.params.id;

    // Get transaction data from req.body
    const { account, categories, amount, title, description, date, type, status } = req.body;

    // Get transaction from db
    const transaction = await Transaction.findOne({ _id: transactionId, user: userId });
    if (!transaction) {
        res.status(404);
        throw new Error('Transaction not found');
    }

    // Update transaction
    transaction.account = account || transaction.account;
    transaction.categories = categories || transaction.categories;
    transaction.amount = amount || transaction.amount;
    transaction.title = title || transaction.title;
    transaction.description = description || transaction.description;
    transaction.date = date || transaction.date;
    transaction.type = type || transaction.type;
    transaction.status = status || transaction.status;

    // Save transaction
    await transaction.save();

    // Send response
    res.json({
        message: 'Transaction updated successfully',
        transaction
    });
});

const deleteTransaction = asyncHandler(async (req, res) => {
    // Get user id from req.user
    const userId = req.user._id;

    // Get transaction id from req.params
    const transactionId = req.params.id;

    // Get transaction from db
    const transaction = await Transaction.findOne({ _id: transactionId, user: userId });
    if (!transaction) {
        res.status(404);
        throw new Error('Transaction not found');
    }

    // Delete transaction
    await Transaction.findByIdAndDelete(transactionId);

    // Send response
    res.json({
        message: 'Transaction deleted successfully'
    });
});


module.exports = {
    getTransactionTypes,
    getTransactionStatuses,
    getTransactions,
    getTransactionById,
    createTransaction,
    updateTransaction,
    deleteTransaction
}