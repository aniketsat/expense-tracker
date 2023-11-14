const asyncHandler = require('express-async-handler');
const {
    JWT_ACCESS_SECRET,
} = require('../config/config');
const { verifyToken } = require('../utils/token');

const protect = asyncHandler(async (req, res, next) => {
    let token;

    // Check if token exists and is valid
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            // Verify token
            const { decoded, statusCode } = verifyToken(token, JWT_ACCESS_SECRET);
            if (!decoded) {
                res.status(statusCode);
                throw new Error(statusCode === 401 ? 'Invalid token' : 'Token expired');
            }
            req.user = decoded;
            next();
        } catch (error) {
            res.status(401);
            throw new Error('Not authorized, token failed');
        }
    } else {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
});

module.exports = { protect };