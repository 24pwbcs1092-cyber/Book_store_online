require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const logger = require('./src/middleware/logger');
const errorHandler = require('./src/middleware/errorHandler');
const bookRoutes = require('./src/routes/bookRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(logger);

// Routes
app.use('/api/books', bookRoutes);

// Root route
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Online Bookstore Management API',
        version: '1.0.0',
        status: 'Operational',
        timestamp: new Date().toISOString(),
        author: 'Muhammad Hamza',
        endpoints: {
            books: {
                getAllBooks: 'GET /api/books',
                getBookById: 'GET /api/books/:id',
                addBook: 'POST /api/books',
                updateBook: 'PUT /api/books/:id',
                deleteBook: 'DELETE /api/books/:id',
                searchBooks: 'GET /api/books?author={name}&genre={type}&page={n}&limit={m}'
            }
        },
        documentation: 'https://github.com/muhammad-hamza66/BOOK_STORE#readme'
    });
});

// 404 handler for undefined routes
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: 'Route not found'
    });
});

// Error handler (must be last)
app.use(errorHandler);

// Database connection and Server Start
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/bookstore';

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('MongoDB connected successfully');
    } catch (err) {
        console.error('MongoDB connection error:', err.message);
        // On Vercel, we might not want to exit the process, but for now we keep it
        // Or we can just let it fail and Vercel will retry
    }
};

// Start server only if run directly
if (require.main === module) {
    const PORT = process.env.PORT || 5000;
    connectDB().then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    });
} else {
    // Connect to DB when imported (by Vercel)
    connectDB();
}

module.exports = app;
