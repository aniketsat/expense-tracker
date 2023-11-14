const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const {
    JWT_ACCESS_SECRET,
    JWT_REFRESH_SECRET,
    JWT_ACCESS_EXPIRES_IN,
    JWT_REFRESH_EXPIRES_IN
} = require('../config/config');

const verifyAccessToken = asyncHandler((req, res, next) => {
    let accessToken;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        accessToken = req.headers.authorization.split(' ')[1];
    } else {
        return res.status(401).json({message: 'You are not authorized'});
    }

    if (!accessToken) {
        return res.status(401).json({message: 'You are not authorized'});
    }

    const decoded = jwt.verify(accessToken, JWT_ACCESS_SECRET);
    if (!decoded) {
        return res.status(401).json({message: 'You are not authorized'});
    } else {
        req.user = decoded;
        next();
    }
});

