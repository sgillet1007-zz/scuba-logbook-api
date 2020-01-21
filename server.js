const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const colors = require('colors');
const connectDB = require('./config/db');

// Route files
const dives = require('./routes/dives');
const auth = require('./routes/auth');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Connect to mongo database
connectDB();

const app = express();

// Body parser
app.use(express.json());

// Mount routers
app.use('/api/v1/dives', dives);
app.use('/api/v1/auth', auth);

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 5000;

const server = app.listen(
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold)
);

// Handler for unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red);
    server.close(() => process.exit(1));
});
