const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const {generateToken, verifyToken} = require("../utils/token");
const {
    JWT_ACCESS_SECRET,
    JWT_ACCESS_EXPIRES_IN,
    JWT_REFRESH_SECRET,
    JWT_REFRESH_EXPIRES_IN
} = require("../config/config");
const OTP = require("../models/otpModel");
const { generateUsername } = require("../utils/user");


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
            refreshToken,
            user: {
                _id: userExists._id,
                firstName: userExists.firstName,
                lastName: userExists.lastName,
                email: userExists.email,
                username: userExists.username,
            }
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

    // Check if OTP is verified
    const otpExists = await OTP.findOne({ email });
    if (!otpExists) {
        res.status(404);
        throw new Error('You have not verified your email');
    } else {
        if (!otpExists.isVerified) {
            res.status(401);
            throw new Error('You have not verified your email');
        }
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

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
    console.log(username)

    // Create user
    const user = await User.create({
        firstName,
        lastName,
        email,
        username,
        password: hashedPassword
    });
    console.log(user)
    if(!user) {
        res.status(404);
        throw new Error("Something went wrong");
    }

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
        res.status(401);
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


module.exports = {
    login,
    register,
    logout,
    refreshToken,
}