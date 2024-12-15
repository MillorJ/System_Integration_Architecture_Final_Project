const express = require('express');
const router = express.Router();
const CustomerService = require('../services/customerService');
const { authenticateToken, authorizeRoles } = require('../middleware/customerMiddleware'); // Import the middlewares

// Apply authentication and role-based authorization to all routes below
router.use(authenticateToken); // First, authenticate the user

// Routes that require either 'admin' or 'sales agent' roles
router.get('/', authorizeRoles('admin', 'sales agent'), async (req, res) => {
    const customers = await CustomerService.getAllCustomers();
    res.json(customers);
});

router.get('/:id', authorizeRoles('admin', 'sales agent'), async (req, res) => {
    const customer = await CustomerService.getCustomerById(req.params.id);
    if (!customer) return res.status(404).json({ message: 'Customer not found' });
    res.json(customer);
});

router.post('/', authorizeRoles('admin', 'sales agent'), async (req, res) => {
    const customer = await CustomerService.createCustomer(req.body);
    res.status(201).json(customer);
});

router.put('/:id', authorizeRoles('admin', 'sales agent'), async (req, res) => {
    const customer = await CustomerService.updateCustomer(req.params.id, req.body);
    if (!customer) return res.status(404).json({ message: 'Customer not found' });
    res.json(customer);
});

router.delete('/:id', authorizeRoles('admin', 'sales agent'), async (req, res) => {
    const result = await CustomerService.deleteCustomer(req.params.id);
    if (!result) return res.status(404).json({ message: 'Customer not found' });
    res.status(204).send();
});

module.exports = router;
