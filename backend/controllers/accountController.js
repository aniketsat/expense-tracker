const asyncHandler = require('express-async-handler');
const Account = require('../models/accountModel');


const getAccountTypes = asyncHandler(async (req, res) => {
    // Get account types from account model
    const accountTypes = Account.schema.path('type').enumValues;

    // If no account types, return error
    if (!accountTypes) {
        res.status(500);
        throw new Error('Something went wrong');
    }

    // Fetch balance for each account type
    const accountTypeBalance = await Account.aggregate([
        {
            $group: {
                _id: '$type',
                balance: { $sum: '$balance' }
            }
        }
    ]);

    const accountTypeWithBalance = accountTypes.map(type => {
        const accountType = accountTypeBalance.find(t => t.type === type);
        return {
            type,
            balance: accountType ? accountType.balance : 0
        }
    });

    // Return account types
    res.status(200).json({
        message: 'Account types fetched successfully',
        types: accountTypeWithBalance
    });
});

const createAccount = asyncHandler(async (req, res) => {
    const { name, type, balance } = req.body;

    const account = new Account({
        name,
        type,
        balance,
        user: req.user._id
    });
    if (!account) {
        res.status(400);
        throw new Error('Invalid account data');
    }

    const createdAccount = await account.save();
    if (!createdAccount) {
        res.status(500);
        throw new Error('Something went wrong');
    }

    res.status(201).json({
        message: 'Account created successfully',
        account: createdAccount
    });
});

const getAccounts = asyncHandler(async (req, res) => {
    // Get user id from req.user._id
    const userId = req.user._id;

    const { type } = req.query;

    // Find all accounts with user id
    let accounts;
    if (type) {
        accounts = await Account.find({ user: userId, type });
    } else {
        accounts = await Account.find({ user: userId });
    }

    // Return accounts
    res.status(200).json({
        message: 'Accounts fetched successfully',
        accounts
    });
});

const getAccountById = asyncHandler(async (req, res) => {
    // Get user id from req.user._id
    const userId = req.user._id;

    // Get account id from req.params.id
    const accountId = req.params.id;

    // Find account with user id and account id
    const account = await Account.findOne({ _id: accountId, user: userId });
    if (!account) {
        res.status(404);
        throw new Error('Account not found');
    }

    // Return account
    res.status(200).json({
        message: 'Account fetched successfully',
        account
    });
});

const updateAccount = asyncHandler(async (req, res) => {
    // Get user id from req.user._id
    const userId = req.user._id;

    // Get account id from req.params.id
    const accountId = req.params.id;

    // Find account with user id and account id
    const account = await Account.findOne({ _id: accountId, user: userId });
    if (!account) {
        res.status(404);
        throw new Error('Account not found');
    }

    // Update account
    account.name = req.body.name || account.name;
    account.type = req.body.type || account.type;
    account.balance = req.body.balance || account.balance;

    const updatedAccount = await account.save();
    if (!updatedAccount) {
        res.status(500);
        throw new Error('Something went wrong');
    }

    // Return updated account
    res.status(200).json({
        message: 'Account updated successfully',
        account: updatedAccount
    });
});

const deleteAccount = asyncHandler(async (req, res) => {
    // Get user id from req.user._id
    const userId = req.user._id;

    // Get account id from req.params.id
    const accountId = req.params.id;

    // Find account with user id and account id
    const account = await Account.findOne({ _id: accountId, user: userId });
    if (!account) {
        res.status(404);
        throw new Error('Account not found');
    }

    // Delete account
    await Account.findByIdAndDelete(accountId);

    // Return success message
    res.status(200).json({
        message: 'Account deleted successfully',
        account
    });
});


module.exports = {
    getAccountTypes,
    createAccount,
    getAccounts,
    getAccountById,
    updateAccount,
    deleteAccount
}