const jwt = require('jsonwebtoken');

// Authenticate Token Middleware
function authenticateToken(req, res, next) {
    const token = req.header('Authorization')?.split(' ')[1]; // Bearer token
    if (!token) return res.status(401).json({ message: 'Unauthorized: No token provided' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_secret_key'); 
        req.user = decoded; 
        next();
    } catch (err) {
        res.status(403).json({ message: 'Forbidden: Invalid token' });
    }
}

// Authorize Roles Middleware
function authorizeRoles(...allowedRoles) {
    return (req, res, next) => {
        const userRole = req.user?.role;

        if (!userRole) {
            return res.status(401).json({ message: 'Unauthorized: Role not found' });
        }

        if (!allowedRoles.includes(userRole)) {
            return res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
        }

        next();
    };
}

// Generate Default Tokens
function generateDefaultTokens() {
    const secret = process.env.JWT_SECRET || 'default_secret_key';

    const adminToken = jwt.sign({ role: 'admin' }, secret, { expiresIn: '1h' });
    const salesAgentToken = jwt.sign({ role: 'sales agent' }, secret, { expiresIn: '1h' });

    return {
        admin: adminToken,
        salesAgent: salesAgentToken,
    };
}

module.exports = {
    authenticateToken,
    authorizeRoles,
    generateDefaultTokens,
};
