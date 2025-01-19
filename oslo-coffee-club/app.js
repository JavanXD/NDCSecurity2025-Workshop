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


// Basic CSP that allows scripts from CDN and self (not breaking functionality was important when creating CSP, but it could be improved)
app.use((req, res, next) => {
    // Set the Content-Security-Policy header: 
    // default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; connect-src 'self'; img-src 'self' data:;
    res.setHeader('Content-Security-Policy', [
        // Restrict the default behaviour for all resources to only allow loading from the same origin
        "default-src 'self';",
        // Allow scripts to be loaded only from the same origin and the specified CDN
        // Note: 'unsafe-inline' is included, which weakens security. Replace it with hashes or nonces if possible.
        "script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net;",
        // Allow styles to be loaded only from the same origin and the specified CDN
        "style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net;",
        // Restrict connections (e.g., AJAX, WebSocket) to only the same origin
        "connect-src 'self';",
        // Restrict images to load only from the same origin or `data:` URIs
        "img-src 'self' data:;"
    ].join(' ')); 

    next();
});

// Body parser to handle JSON requests
app.use(bodyParser.json());
// Serve static files
app.use(express.static('public'));

//  Endpoint to View All Orders
app.get('/api/orders', (req, res) => {
    res.json(coffeeOrders);
});

// Coffee Ordering Endpoint (POST & GET - GET for CSRF via <img>)
app.all('/api/order', (req, res) => {
    const { coffee, name } = req.method === 'POST' ? req.body : req.query;

    // Add the order directly to the database
    coffeeOrders.push({ coffee, name });

    console.log(`New ${req.method} order: ${name} ordered ${coffee}`);

    if (req.method === 'POST') {
        res.json({ message: `${name}'s order for ${coffee} has been placed!` });
    } else {
        res.send(`<p>${name}'s order for ${coffee} has been received!</p>`);
    }
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