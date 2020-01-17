const express = require('express');
const path = require('path');
const dotenv = require('dotenv');

// Route files
const dives = require('./routes/dives');

// Load env vars
dotenv.config({ path: './config/config.env' });

const app = express();

// Mount routers
app.use('/api/v1/dives', dives);

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 5000;

app.listen(
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
    )
);

// Handler for unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red);
    ServiceWorkerRegistration.close(() => process.exit(1));
});
