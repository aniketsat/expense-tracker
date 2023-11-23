const mongoose = require('mongoose');


const transactionSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: true
    },
    categories: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category'
        }
    ],
    amount: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type:String,
        required: false
    },
    date: {
        type: Date,
        required: true
    },
    type: {
        type: String,
        enum: ['INCOME', 'EXPENSE'],
        required: true
    },
    status: {
        type: String,
        enum: ['PENDING', 'COMPLETED'],
        default: 'PENDING',
        required: true
    }
}, {
    timestamps: true
});

const Transaction = mongoose.model('Transaction', transactionSchema);


module.exports = Transaction;