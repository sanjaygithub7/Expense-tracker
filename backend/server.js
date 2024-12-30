const express = require('express');
const connectdatabase = require('./config/connectDB');
const dotenv = require('dotenv');
const path = require('path');

const app = express();

// Load environment variables
dotenv.config({ path: path.join(__dirname, 'config', 'config.env') });

// Database connection
connectdatabase();

// Middleware
app.use(express.json());

// Import routes
const userRoutes = require('./routes/userroute');
const expenseRoutes = require('./routes/expenseroute');

// Mount routes
app.use('/api/users', userRoutes);
app.use('/api/expenses', expenseRoutes);

// Fallback for undefined routes
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
