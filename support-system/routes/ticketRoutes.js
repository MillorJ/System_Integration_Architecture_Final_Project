const express = require('express');
const router = express.Router();
const {
    createTicket,
    getTickets,
    getTicketById,
    updateTicketStatus,
} = require('../services/supportService');
const { authenticateToken, authorizeRoles } = require('../middleware/supportMiddleware'); // Assuming role-based access control is handled here

// Apply authentication to all routes
router.use(authenticateToken); // Ensure the user is authenticated first

// Create a new ticket (restricted to support manager and admin)
router.post('/', authorizeRoles('support manager', 'admin'), async (req, res) => {
    try {
        const ticket = await createTicket(req.body);
        res.status(201).json(ticket);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Failed to create ticket' });
    }
});

// Get all tickets (restricted to support manager and admin)
router.get('/', authorizeRoles('support manager', 'admin'), async (req, res) => {
    try {
        const tickets = await getTickets();
        res.json(tickets);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Failed to fetch tickets' });
    }
});

// Get a ticket by ID (restricted to support manager and admin)
router.get('/:id', authorizeRoles('support manager', 'admin'), async (req, res) => {
    try {
        const ticket = await getTicketById(req.params.id);
        if (!ticket) return res.status(404).json({ error: 'Ticket not found' });
        res.json(ticket);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Failed to fetch ticket' });
    }
});

// Update ticket status (restricted to support manager and admin)
router.put('/:id/status', authorizeRoles('support manager', 'admin'), async (req, res) => {
    try {
        const updatedTicket = await updateTicketStatus(req.params.id, req.body.status);
        if (!updatedTicket) return res.status(404).json({ error: 'Ticket not found' });
        res.json(updatedTicket);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Failed to update ticket status' });
    }
});

module.exports = router;
