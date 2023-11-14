const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const {
    JWT_ACCESS_SECRET,
    JWT_REFRESH_SECRET,
    JWT_ACCESS_EXPIRES_IN,
    JWT_REFRESH_EXPIRES_IN
} = require('../config/config');
const { generateUsername } = require('../utils/user');
const { generateToken, verifyToken } = require('../utils/token');

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (!userExists) {
        res.status(404);
        throw new Error('Email does not exist');
    }

    // Check if password is correct
    const isPasswordCorrect = await bcrypt.compare(password, userExists.password);
    if (!isPasswordCorrect) {
        res.status(401);
        throw new Error('Invalid credentials');
    }

    // Generate Access Token
    const accessToken = generateToken(userExists._id, JWT_ACCESS_SECRET, JWT_ACCESS_EXPIRES_IN);
    // Generate Refresh Token
    const refreshToken = generateToken(userExists._id, JWT_REFRESH_SECRET, JWT_REFRESH_EXPIRES_IN);

    res.status(200).json({
        message: "Login successful",
        data: {
            accessToken,
            refreshToken
        }
    });
});

const register = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error('Email already exists');
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword
    });

    // Generate username
    let username = generateUsername(firstName, lastName);
    while (true) {
        const userNameExists = await User.findOne({ username });
        if (!userNameExists) {
            break;
        } else {
            username = generateUsername(firstName, lastName);
        }
    }
    user.username = username;
    await user.save();

    res.status(201).json({
        message: "Registration successful"
    })
});

const logout = asyncHandler(async (req, res) => {
    res.status(200).json({
        message: "Logout successful"
    });
});

const refreshToken = asyncHandler(async (req, res) => {
    const { refreshToken } = req.body;

    // Check if refresh token exists
    if (!refreshToken) {
        res.status(401);
        throw new Error('No refresh token provided');
    }

    // Verify refresh token
    const { decoded, statusCode } = verifyToken(refreshToken, JWT_REFRESH_SECRET);
    if (!decoded) {
        res.status(statusCode);
        throw new Error('Invalid refresh token');
    }

    // Generate new access token
    const accessToken = generateToken(decoded.id, JWT_ACCESS_SECRET, JWT_ACCESS_EXPIRES_IN);

    res.status(200).json({
        message: "Access token refreshed",
        data: {
            accessToken,
            refreshToken
        }
    });
});

const getUserProfile = asyncHandler(async (req, res) => {
    const { username } = req.params;

    // Check if user exists
    const userExists = await User.findOne({ username }).select('-password');
    if (!userExists) {
        res.status(404);
        throw new Error('User does not exist');
    }

    res.status(200).json({
        message: "User profile retrieved",
        data: {
            user: userExists
        }
    });
});

module.exports = {
    login,
    register,
    logout,
    refreshToken,
    getUserProfile
}