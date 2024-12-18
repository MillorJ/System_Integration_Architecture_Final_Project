const mongoose = require('mongoose');

const DB_URI = process.env.SUPPORT_DB_URI || 'mongodb://localhost:27017/support-db';

const connectDB = async () => {
    try {
        await mongoose.connect(DB_URI);
        console.log('Connected to Support Database successfully');
    } catch (error) {
        console.error('Error connecting to Support Database:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
