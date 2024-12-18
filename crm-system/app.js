const express = require('express');
const mongoose = require('mongoose');
const supportRoutes = require('./routes/customerRoutes'); // Assuming you have support-related routes

const { generateDefaultTokens } = require('./middleware/authMiddleware');
const promClient = require('prom-client');
const logger = require('../shared/utils/logger');
const app = express();

// Initialize Prometheus registry
const register = new promClient.Registry();

// Define a metric for requests to the CRM system
const crmSystemRequestCounter = new promClient.Counter({
    name: 'crm_system_requests',
    help: 'Total number of requests to the CRM system',
    labelNames: ['status']
});

// Register the metric
register.registerMetric(crmSystemRequestCounter);

// Middleware to increment the request counter
app.use((req, res, next) => {
    res.on('finish', () => {
        crmSystemRequestCounter.labels(res.statusCode).inc();
    });
    next();
});

// Prometheus /metrics endpoint
app.get('/metrics', async (req, res) => {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
});

// Middleware to parse JSON requests
app.use(express.json());

// Define the PORT
const PORT = process.env.PORT || 3001;

// Generate Default Tokens
const tokens = generateDefaultTokens();
console.log('Default Tokens:');
console.log('Admin Token:', tokens.admin);
console.log('Sales Agent Token:', tokens.salesAgent);

// Database Connection
mongoose
    .connect('mongodb://localhost:27017/crm_system')
    .then(() => console.log(`Connected to CRM System Database and is running on port ${PORT}`))
    .catch((err) => console.error('Database connection error:', err));

// Routes
// Use support-related routes (assuming you have defined supportRoutes)
app.use('/api/support', supportRoutes);


// Start Server
app.listen(PORT, () => {
    logger.info(`CRM System is running on port ${PORT}`);
});
