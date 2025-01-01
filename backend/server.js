const express = require('express');
const connectdatabase = require('./config/connectDB');
const dotenv = require('dotenv');
const path = require('path');
const PORT =  3000;

const app = express();

// Load environment variables
dotenv.config({ path: path.join(__dirname, 'config', 'config.env') });

//DB connection
connectdatabase();


app.use(express.json());

// Importing routes
const userRoutes = require('./routes/userroute');
const expenseRoutes = require('./routes/expenseroute');


app.use('/api/users', userRoutes);
app.use('/api/expenses', expenseRoutes);

// alternative for not available routes
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

// Start server

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
