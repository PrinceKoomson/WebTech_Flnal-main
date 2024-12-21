const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors'); // Add this line

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Enable CORS
app.use(cors()); // Add this line

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

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
app.get('/dashboard-web-development.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/dashboard-web-development.html'));
});

app.get('/dashboard-cybersecurity.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/dashboard-cybersecurity.html'));
});

app.get('/dashboard-cloud-engineering.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/dashboard-cloud-engineering.html'));
});

app.get('/dashboard-ai-and-machine-learning.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/dashboard-ai-and-machine-learning.html'));
});

// POST endpoint to handle signup form submission
app.post('/api/signup', (req, res) => {
    const { name, email, password, career_interest, skill_level, time_commitment } = req.body;

    console.log('Received signup data:', req.body);

    // Here you would typically save the data to a database
    // For now, we'll just send a success response

    res.json({
        message: 'Signup successful!',
        redirectUrl: '/general-dashboard.html'
    });
});

// Start Server
app.listen(port, '0.0.0.0', () => {
    console.log(`Server running at http://localhost:${port}`);
});