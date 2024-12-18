const Ticket = require('../models/Ticket');
const Customer = require('../models/Customers');

// Function to initialize the customer and ticket
const initializeData = async () => {
    try {
        // Check if a customer already exists
        let customer = await Customer.findOne();

        // If no customer exists, create a default customer (John Snow)
        if (!customer) {
            customer = new Customer({
                name: 'John Snow',
                email: 'john.snow@example.com',
                phone: '1234567890', // Example phone number
                address: {
                    street: 'Winterfell Street',
                    city: 'Winterfell',
                    state: 'North',
                    zipCode: '12345',
                },
            });
            await customer.save();
            console.log('Customer created:', customer);
        }

        // Check if any tickets exist
        let ticket = await Ticket.findOne();

        // If no tickets exist, create a fake ticket
        if (!ticket) {
            ticket = new Ticket({
                customerId: b74ef5b9d1e36e8e7c66c2,
                issue: 'Example issue description',
                status: 'Open',
            });
            await ticket.save();
            console.log('Ticket created:', ticket);
        }

    } catch (error) {
        console.error('Error initializing data:', error);
    }
};

module.exports = initializeData;
