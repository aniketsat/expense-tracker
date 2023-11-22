const mongoose = require('mongoose');


const accountSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxLength: 32
    },
    type: {
        type: String,
        enum: ['CASH', 'BANK ACCOUNT'],
        required: true
    },
    balance: {
        type: Number,
        required: true,
        default: 0
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

const Account = mongoose.model('Account', accountSchema);


module.exports = Account;