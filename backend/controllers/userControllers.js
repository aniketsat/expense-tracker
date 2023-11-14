const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const login = asyncHandler(async (req, res) => {});

const register = asyncHandler(async (req, res) => {});

const logout = asyncHandler(async (req, res) => {});

const refreshToken = asyncHandler(async (req, res) => {});

const getUserProfile = asyncHandler(async (req, res) => {});

module.exports = {
    login,
    register,
    logout,
    refreshToken,
    getUserProfile
}