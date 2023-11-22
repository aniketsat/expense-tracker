const asyncHandler = require('express-async-handler');
const Category = require('../models/categoryModel');


const getAllCategories = asyncHandler(async (req, res) => {
    // Get the user id
    const userId = req.user._id;

    // Get all categories
    const categories = await Category.find({ user: userId });

    // Send the response
    res.status(200).json({
        message: 'Categories fetched successfully',
        categories
    });
});

const getCategoryById = asyncHandler(async (req, res) => {
    // Get the user id
    const userId = req.user._id;

    // Get the category id
    const categoryId = req.params.id;

    // Get the category
    const category = await Category.findOne({ _id: categoryId, user: userId });
    if (!category) {
        res.status(404);
        throw new Error('Category not found');
    }

    // Send the response
    res.status(200).json({
        message: 'Category fetched successfully',
        category
    });
});

const createCategory = asyncHandler(async (req, res) => {
    // Get the user id
    const userId = req.user._id;

    // Get the title and description from the request body
    const { title, description } = req.body;

    // Create the category
    const category = await Category.create({
        title,
        description,
        user: userId
    });
    if (!category) {
        res.status(400);
        throw new Error('Invalid category data');
    }

    // Send the response
    res.status(201).json({
        message: 'Category created successfully',
        category
    });
});

const updateCategory = asyncHandler(async (req, res) => {
    // Get the user id
    const userId = req.user._id;

    // Get the category id
    const categoryId = req.params.id;

    // Get the title and description from the request body
    const { title, description } = req.body;

    // Get the category
    const category = await Category.findOne({ _id: categoryId, user: userId });
    if (!category) {
        res.status(404);
        throw new Error('Category not found');
    }

    // Update the category
    category.title = title || category.title;
    category.description = description || category.description;
    await category.save();

    // Send the response
    res.status(200).json({
        message: 'Category updated successfully',
        category
    });
});

const deleteCategory = asyncHandler(async (req, res) => {
    // Get the user id
    const userId = req.user._id;

    // Get the category id
    const categoryId = req.params.id;

    // Get the category
    const category = await Category.findOne({ _id: categoryId, user: userId });
    if (!category) {
        res.status(404);
        throw new Error('Category not found');
    }

    // Delete the category
    await Category.findByIdAndDelete(categoryId);

    // Send the response
    res.status(200).json({
        message: 'Category deleted successfully'
    });
});


module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
}