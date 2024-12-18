const express = require('express');
const router = express.Router();
const InventoryService = require('../services/inventoryService');
const { authenticateToken, authorizeRoles } = require('../middlewares/authMiddleware');
const checkRole = require('../middlewares/roleMiddleware');

// Use the authentication middleware for all routes in this file
router.use(authenticateToken);

// Get all products (restricted to admin and product manager)
router.get('/', authorizeRoles('admin', 'product manager'), async (req, res) => {
    try {
        const products = await InventoryService.getAllProducts();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error: error.message });
    }
});

// Get a single product by ID (restricted to admin and product manager)
router.get('/:id', authorizeRoles('admin', 'product manager'), async (req, res) => {
    try {
        const product = await InventoryService.getProductById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching product', error: error.message });
    }
});

// Create a new product (restricted to admin and product manager)
router.post('/', authorizeRoles('admin', 'product manager'), async (req, res) => {
    try {
        const product = await InventoryService.createProduct(req.body);
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error creating product', error: error.message });
    }
});

// Update an existing product (restricted to admin and product manager)
router.put('/:id', authorizeRoles('admin', 'product manager'), async (req, res) => {
    try {
        const product = await InventoryService.updateProduct(req.params.id, req.body);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error updating product', error: error.message });
    }
});

// Delete a product (restricted to admin and product manager)
router.delete('/:id', authorizeRoles('admin', 'product manager'), async (req, res) => {
    try {
        const result = await InventoryService.deleteProduct(req.params.id);
        if (!result) return res.status(404).json({ message: 'Product not found' });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product', error: error.message });
    }
});

module.exports = router;
