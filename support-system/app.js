const express = require('express');
const connectDB = require('./config/db');
const ticketRoutes = require('./routes/ticketRoutes');
const { generateDefaultTokens } = require('./middleware/authMiddleware');
const initializeData = require('./middleware/initialData'); // Import the initializeData function

const app = express();

// Middleware
app.use(express.json());

// Define the PORT
const PORT = process.env.PORT || 3003;

// Generate Default Tokens
const tokens = generateDefaultTokens();
console.log('Default Tokens:');
console.log('Admin Token:', tokens.admin);
console.log('Support Manager Token:', tokens.supportManager);

// Connect to the Database
connectDB()
    .then(() => {
        console.log(`Connected to the Support System Database`);
        
        // Initialize data if needed
        initializeData();

        // Start Server
        app.listen(PORT, () => {
            console.log(`Support System is running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => console.error('Database connection error:', err));

// API Routes
app.use('/tickets', ticketRoutes);

// Health check endpoint
app.get('/', (req, res) => res.send('Support System is running'));
