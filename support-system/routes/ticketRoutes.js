const express = require('express');
const router = express.Router();
const {
    createTicket,
    getTickets,
    getTicketById,
    updateTicketStatus,
} = require('../services/supportService');
const { authenticateToken, authorizeRoles } = require('../middleware/authMiddleware'); // Authentication and Authorization middleware
const Ticket = require('../models/Ticket'); // Ensure the path is correct

// Apply authentication to all routes
router.use(authenticateToken); // Ensure the user is authenticated first

// Create a new ticket (restricted to support manager and admin)
router.post('/', authorizeRoles('support manager', 'admin'), async (req, res, next) => {
    const { customerId, issue, status } = req.body;

    if (!customerId) {
        return res.status(400).json({ error: 'Customer ID is required' });
    }

    try {
        const ticket = await createTicket({ customerId, issue, status });
        res.status(201).json(ticket);
    } catch (error) {
        res.status(500).json({ error: 'Error creating ticket', details: error.message });
    }
});

// Get all tickets (restricted to support manager and admin)
router.get('/', authorizeRoles('support manager', 'admin'), async (req, res, next) => {
    try {
        const tickets = await getTickets(); // Get all tickets from the database
        res.json(tickets); // Return the list of tickets
    } catch (error) {
        next(error); // Pass the error to the errorHandler middleware
    }
});

// Get a ticket by ID (restricted to support manager and admin)
router.get('/:id', authorizeRoles('support manager', 'admin'), async (req, res, next) => {
    try {
        const ticket = await getTicketById(req.params.id); // Get a ticket by ID
        if (!ticket) return res.status(404).json({ error: 'Ticket not found' });
        res.json(ticket); // Return the ticket by ID
    } catch (error) {
        next(error); // Pass the error to the errorHandler middleware
    }
});

// Update ticket status (restricted to support manager and admin)
router.put('/:id/status', authorizeRoles('support manager', 'admin'), async (req, res, next) => {
    try {
        const updatedTicket = await updateTicketStatus(req.params.id, req.body.status); // Update the ticket status
        if (!updatedTicket) return res.status(404).json({ error: 'Ticket not found' });
        res.json(updatedTicket); // Return the updated ticket
    } catch (error) {
        next(error); // Pass the error to the errorHandler middleware
    }
});

router.delete('/:id', authorizeRoles('support manager', 'admin'), async (req, res, next) => {
    try {
        // Attempt to delete the ticket by its ID
        const deletedTicket = await Ticket.findByIdAndDelete(req.params.id);

        if (!deletedTicket) {
            return res.status(404).json({ error: 'Ticket not found' });
        }

        res.status(200).json({ message: 'Ticket deleted successfully', ticket: deletedTicket });
    } catch (error) {
        next(error); // Pass the error to errorHandler middleware
    }
});

module.exports = router;
