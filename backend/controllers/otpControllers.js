const asyncHandler = require('express-async-handler');
const nodemailer = require('nodemailer');
const OTP = require('../models/otpModel');


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


module.exports = { sendOTP, verifyOTP };