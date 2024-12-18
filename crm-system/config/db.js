const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/crm');

mongoose.connection.on('connected', () => {
    console.log('Connected to CRM database');
});
