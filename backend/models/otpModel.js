const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        lowercase: true,
        required: true,
        unique: true,
        trim: true
    },
    otp: {
        type: Number,
        required: true
    },
    sentAt: {
        type: Date,
        required: true
    },
    expiresAt: {
        type: Date,
        required: true
    },
    isVerified: {
        type: Boolean,
        required: true,
        default: false
    }
}, {
    timestamps: true
});

const OTP = mongoose.model('OTP', otpSchema);

module.exports = OTP;