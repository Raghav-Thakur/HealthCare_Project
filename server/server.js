// FRAMEWORK CONFIGURATION
// --- Always Import/Require on top ---
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDb = require("./config/dbConnection");

// Load environment variables from .env file
dotenv.config();

// Initialize express app
const app = express();

// Set the view engine
app.set('view engine', 'hbs');

// Connect to the database
connectDb();

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
app.get("/home",(req,res) =>{
    const data = {
        title:"document",
        message:"hello world"
    }
    res.render("home",data)
})
app.get("/user",(req,res)=>{
    const users = [
    {
        id:1,
        name:"raghav",
        age:20
    },
    {
        id:2,
        name:"pransh",
        age:2
    }
    ]
    res.render("user",{ users })
})
// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`);  // Corrected backticks for template literal
});
