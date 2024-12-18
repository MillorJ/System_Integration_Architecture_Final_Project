const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const router = require('../routes/ticketRoutes'); // Adjust the path to your routes
const Ticket = require('../models/Ticket');
const Customer = require('../models/Customers'); // Corrected model name

app.use(express.json()); // To parse JSON bodies
app.use('/tickets', router); // Mount the ticket routes

// Dummy token for authentication
const token = 'Bearer <your_valid_token>';

describe('Ticket Routes', () => {
    let customerId;

    beforeAll(async () => {
        // Setup a dummy customer before tests
        const customer = new Customer({
            name: 'John Doe',
            email: 'john.doe@example.com',
            phone: '1234567890',
            address: {
                street: '123 Main St',
                city: 'Sample City',
                state: 'State',
                zipCode: '12345',
            },
        });
        const savedCustomer = await customer.save();
        customerId = savedCustomer._id;
    });

    afterAll(async () => {
        // Clean up test data
        await Ticket.deleteMany({});
        await Customer.deleteMany({});
        await mongoose.disconnect();
    });

    // Test case 1: Create a new ticket
    it('should create a new ticket', async () => {
        const ticketData = {
            customerId,
            issue: 'Issue with product delivery',
        };

        const response = await request(app)
            .post('/tickets')
            .set('Authorization', token) // Authentication
            .send(ticketData);

        expect(response.status).toBe(201); // Should return status code 201 (Created)
        expect(response.body).toHaveProperty('_id');
        expect(response.body).toHaveProperty('customerId');
        expect(response.body.issue).toBe(ticketData.issue);
        expect(response.body.status).toBe('Open'); // Default status
    });

    // Test case 2: Get all tickets
    it('should get all tickets', async () => {
        const response = await request(app)
            .get('/tickets')
            .set('Authorization', token);

        expect(response.status).toBe(200); // Should return status code 200 (OK)
        expect(Array.isArray(response.body)).toBe(true); // Should return an array
    });

    // Test case 3: Get ticket by ID
    it('should get a ticket by ID', async () => {
        const ticket = new Ticket({
            customerId,
            issue: 'Issue with product',
        });

        const savedTicket = await ticket.save();

        const response = await request(app)
            .get(`/tickets/${savedTicket._id}`)
            .set('Authorization', token);

        expect(response.status).toBe(200); // Should return status code 200 (OK)
        expect(response.body).toHaveProperty('_id', savedTicket._id);
        expect(response.body.issue).toBe(ticket.issue);
    });

    // Test case 4: Update ticket status
    it('should update ticket status', async () => {
        const ticket = new Ticket({
            customerId,
            issue: 'Product broken',
        });

        const savedTicket = await ticket.save();

        const response = await request(app)
            .put(`/tickets/${savedTicket._id}/status`)
            .set('Authorization', token)
            .send({ status: 'Resolved' });

        expect(response.status).toBe(200); // Should return status code 200 (OK)
        expect(response.body.status).toBe('Resolved');
    });

    // Test case 5: Ticket not found (GET by ID with wrong ID)
    it('should return 404 if ticket not found', async () => {
        const response = await request(app)
            .get('/tickets/invalid_id')
            .set('Authorization', token);

        expect(response.status).toBe(404); // Should return status code 404
        expect(response.body).toHaveProperty('error', 'Ticket not found');
    });
});
