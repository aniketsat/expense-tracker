const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');


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
    getUserProfile,
}