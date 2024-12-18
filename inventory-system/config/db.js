const mongoose = require('mongoose');

// MongoDB connection string
const DB_URI = process.env.INVENTORY_DB_URI || 'mongodb://localhost:27017/inventory-db';

const connectDB = async () => {
    try {
        await mongoose.connect(DB_URI); // Removed deprecated options
        console.log('Connected to Inventory Database successfully');
    } catch (error) {
        console.error('Error connecting to Inventory Database:', error.message);
        process.exit(1); // Exit the application if the connection fails
    }
};

module.exports = connectDB;
