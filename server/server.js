// FRAMEWORK CONFIGURATION
// --- Always Import/Require on top ---
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDb = require("./config/dbConnection");

// Load environment variables from .env file
dotenv.config();

// Connect to the database
connectDb();

// Initialize express app
const app = express();

// Set the port from environment variables or default to 5000
const port = process.env.PORT || 5000;

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware for CORS (Cross-Origin Resource Sharing)
app.use(cors());

// Test route to check if the server is running
app.get('/', (req, res) => {
    res.send("working");
});

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`);  // Corrected backticks for template literal
});
