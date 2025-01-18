const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = 3000;

let coffeeOrders = []; // Simulated database (non-persistent)

// Allow CORS
app.use(
    cors({
        origin: '*', // Allow requests from any origin 
        methods: ['GET', 'POST', 'OPTIONS'], // Allow specific HTTP methods
        allowedHeaders: ['Content-Type'], // Allow specific headers
        credentials: true, // Include cookies in cross-origin requests
    })
);

// Custom header
app.use((req, res, next) => {
    res.setHeader('X-Oslo', 'this is a new custom header');
    
    // <-- placeholder for header manipulation code -->
    next();
});


// Body parser to handle JSON requests
app.use(bodyParser.json());
// Serve static files
app.use(express.static('public'));

// Vulnerable Coffee Ordering Endpoint (POST)
app.post('/api/order', (req, res) => {
    const { coffee, name } = req.body;

    // Add the order directly to the database 
    coffeeOrders.push({ coffee, name });
    console.log(`New POST order: ${name} ordered ${coffee}`);
    res.json({ message: `${name}'s order for ${coffee} has been placed!` });
});

// Coffee Ordering Endpoint (GET - for CSRF via <img>)
app.get('/api/order', (req, res) => {
    const { coffee, name } = req.query;

    // Add the order directly to the database 
    coffeeOrders.push({ coffee, name });
    console.log(`New GET order: ${name} ordered ${coffee}`);
    res.send(`<p>${name}'s order for ${coffee} has been received!</p>`);
});

//  Endpoint to View All Orders
app.get('/api/orders', (req, res) => {
    res.json(coffeeOrders);
});

//  Endpoint to Clear All Orders
app.get('/api/clear-orders', (req, res) => {
    coffeeOrders = []; // Clear the database (all orders)
    console.log('All orders cleared!');
    res.json({ message: 'All orders have been cleared!' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Oslo Coffee Club app running at http://localhost:${PORT}`);
});