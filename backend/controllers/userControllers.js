const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');


const getUserProfile = asyncHandler(async (req, res) => {
    // Get the user id from the request object
    const userId = req.user._id;

    // Find the user in the database by id
    const user = await User.findById(userId).select('-password');
    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    // Send the user object as response
    res.status(200).json({
        message: 'User found',
        user,
    });
});

const updateUserProfile = asyncHandler(async (req, res) => {
    const { firstName, lastName, email } = req.body;

    // Get the user id from the request object
    const userId = req.user._id;

    // Find the user in the database by id
    const user = await User.findById(userId);
    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    // Update the user object
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.email = email || user.email;

    // Save the updated user object
    const updatedUser = await user.save();

    // Send the updated user object as response
    res.status(200).json({
        message: 'User updated',
        user: {
            _id: updatedUser._id,
            firstName: updatedUser.firstName,
            lastName: updatedUser.lastName,
            email: updatedUser.email,
        }
    });
});

const updatePassword = asyncHandler(async (req, res) => {
   const { currentPassword, newPassword } = req.body;

    // Get the user id from the request object
    const userId = req.user._id;

    // Find the user in the database by id
    const user = await User.findById(userId);

    // Check if the password matches
    const isMatch = await bcrypt.compare(currentPassword, user.password);

    // If password does not match, throw an error
    if (!isMatch) {
        res.status(401);
        throw new Error('Invalid password');
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);

    // Update the user object
    user.password = await bcrypt.hash(newPassword, salt);

    // Save the updated user object
    const updatedUser = await user.save();

    // Send the updated user object as response
    res.status(200).json({
        message: 'Password updated',
        user: {
            _id: updatedUser._id,
            firstName: updatedUser.firstName,
            lastName: updatedUser.lastName,
            email: updatedUser.email,
        }
    });
});


module.exports = {
    getUserProfile,
    updateUserProfile,
    updatePassword,
}