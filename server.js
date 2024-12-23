// filepath: /c:/Users/Prince Koomson/Downloads/WebTech_FInal-main/server.js
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config(); // Load environment variables from .env file
const authRoutes = require('./routes/auth');
const roadmapRoutes = require('./routes/roadmapRoutes');
const pool = require('./config/db'); // Ensure this line is added to import the db configuration

const app = express();
const port = process.env.PORT || 3000; // Use environment variable for port if available

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Enable CORS
app.use(cors());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Use auth routes
app.use('/api/auth', authRoutes);

// Use roadmap routes
app.use('/api/roadmap', roadmapRoutes);

// Serve HTML Pages
app.get('/login.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/login.html'));
});

app.get('/signup.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/signup.html'));
});

app.get('/general-dashboard.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/general-dashboard.html'));
});

// Career Dashboards
app.get('/web-development-dashboard.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/web-development-dashboard.html'));
});

app.get('/cyber-security-dashboard.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/cybersecurity-dashboard.html'));
});

app.get('/cloud-engineering-dashboard.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/cloud-engineering-dashboard.html'));
});

app.get('/ai-and-machine-learning-dashboard.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/ai-and-machine-learning-dashboard.html'));
});

// Start Server
app.listen(port, '0.0.0.0', () => {
    console.log(`Server running at http://localhost:${port}`);
});