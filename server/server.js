// FRAMEWORK CONFIGURATION
// --- Always Import/Require on top ---
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDb = require("./config/dbConnection");
const hbs = require("hbs");  // Importing hbs
const path = require("path");  // Importing path
const userRoutes = require("./routes/userRoutes"); // Import user routes

// Load environment variables from .env file
dotenv.config();

// Initialize express app
const app = express();

// Set the view engine
app.set('view engine', 'hbs');

// Connect to the database
connectDb();

// Register partials
hbs.registerPartials(path.join(__dirname, 'views/partials'));

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

// Home route
app.get("/home", (req, res) => {
    const data = {
        title: "document",
        message: "hello world"
    };
    res.render("home", data);
});

// User route
app.get("/user", (req, res) => {
    const users = [
        {
            id: 1,
            name: "raghav",
            age: 20
        },
        {
            id: 2,
            name: "pransh",
            age: 2
        }
    ];
    res.render("user", { users });
});

// In your server.js or wherever you set up your routes
app.get('/api/test-db', async (req, res) => {
    try {
        // Just trying to fetch users to check if the database is connected
        const users = await User.find(); // Assuming User is your model
        res.json(users); // Returns the users if successful
    } catch (error) {
        res.status(500).json({ message: "Database connection failed", error: error.message });
    }
});

// Register user routes after app initialization
app.use("/api", userRoutes); // Use '/api' to access /api/register

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`);
});
