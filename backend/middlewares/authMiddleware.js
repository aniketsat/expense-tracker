const asyncHandler = require('express-async-handler');
const {
    JWT_ACCESS_SECRET,
} = require('../config/config');
const { verifyToken } = require('../utils/token');
const User = require('../models/userModel');
const protect = asyncHandler(async (req, res, next) => {
    let token;

    // Check if token exists and is valid
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
        const { decoded, statusCode } = verifyToken(token, JWT_ACCESS_SECRET);
        if (statusCode === 200) {
            req.user = await User.findById(decoded.id).select('-password');
            next();
        } else {
            res.status(statusCode);
            throw new Error(statusCode === 403 ? 'Token expired' : 'Not authorized, token failed');
        }
    } else {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
});

module.exports = { protect };