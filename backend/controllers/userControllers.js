const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const User = require('../models/userModel');
const OTP = require('../models/otpModel');
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

const sendOTP = asyncHandler(async (req, res) => {
    const { email } = req.body;

    // Generate OTP
    const num = Math.floor(100000 + Math.random() * 900000);

    // Check if OTP exists
    const otpExists = await OTP.findOne({ email });
    if (otpExists) {
        await OTP.findByIdAndDelete(otpExists._id);
    }

    // Save OTP to database
    const otp = await OTP.create({
        email,
        otp: num,
        sentAt: Date.now(),
        expiresAt: Date.now() + 60 * 60 * 1000 // Expires in 1 hour
    });

    // Send OTP to email using nodemailer
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        // secure: true,
        service: 'Gmail',
        auth: {
            user: 'johndoe727073@gmail.com',
            pass: 'gfln ntcz dfws vbam'
        }
    });

    const mailOptions = {
        to: email,
        subject: 'OTP for email verification',
        html: `<p>Your OTP is ${num} and will expire in 1 hour</p>`
    };

    transporter.sendMail(mailOptions, async (err, info) => {
        if (err) {
            await OTP.findByIdAndDelete(otp._id);
            res.status(500);
            res.json({
                message: "Failed to send OTP"
            });
        } else {
            otp.expiresAt = Date.now() + 60 * 60 * 1000;
            otp.save();
            // console.log('Message sent: %s', info.messageId);
            // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
            res.status(200).json({
                message: "OTP sent successfully",
            });
        }
    });
});

const verifyOTP = asyncHandler(async (req, res) => {
    const { email, otp } = req.body;

    // Check if OTP exists
    const otpExists = await OTP.findOne({ email });
    if (!otpExists) {
        res.status(404);
        throw new Error('Wrong OTP');
    }

    // Check if OTP is expired
    if (new Date(otpExists.expiresAt) < Date.now()) {
        await OTP.findByIdAndDelete(otpExists._id);
        res.status(401);
        throw new Error('OTP expired');
    }

    if (otpExists.otp.toString() !== otp.toString()) {
        res.status(401);
        throw new Error('Wrong OTP');
    }

    // Verify OTP
    otpExists.isVerified = true;
    await otpExists.save();

    res.status(200).json({
        message: "OTP verified successfully"
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
    getUserProfile,
    sendOTP,
    verifyOTP
}