const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Create uploads directory if it doesn't exist
const fs = require('fs');
if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
}

// Import routes
try {
    const userRoutes = require('./routes/userRoutes');
    const authRoutes = require('./routes/authRoutes');
    const productRoutes = require('./routes/productRoutes');
    const categoryRoutes = require('./routes/categoryRoutes');
    const verifyToken = require('./middleware/auth');

    // Routes
    app.use('/api/auth', authRoutes);
    app.use('/api/users', verifyToken, userRoutes);
    app.use('/api/products', verifyToken, productRoutes);
    app.use('/api/category', verifyToken, categoryRoutes);

} catch (error) {
    console.error('Error loading routes:', error.message);
    process.exit(1);
}

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Not Found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Find an available port
const findAvailablePort = (startPort) => {
    return new Promise((resolve, reject) => {
        const server = require('net').createServer();
        server.listen(startPort, () => {
            const port = server.address().port;
            server.close(() => resolve(port));
        });
        server.on('error', () => {
            resolve(findAvailablePort(startPort + 1));
        });
    });
};

// Start the server
const startServer = async () => {
    try {
        const PORT = await findAvailablePort(process.env.PORT || 3000);
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();
