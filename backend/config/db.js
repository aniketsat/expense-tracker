const mongoose = require('mongoose');

const { MONGO_URI } = require('./config');

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI, {
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}

module.exports = connectDB;