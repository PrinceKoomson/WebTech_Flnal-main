const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');
const authenticateToken = require('../middleware/authMiddleware');


const router = express.Router();

// Signup Route
router.post('/signup', async (req, res) => {
    const { name, email, password, career_interest, skill_level, time_commitment } = req.body;

    if (!name || !email || !password || !career_interest || !skill_level || !time_commitment) {
        return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = `
            INSERT INTO users (name, email, password, career_interest, skill_level, time_commitment) -- Changed table name from users to roadmap_users
            VALUES ($1, $2, $3, $4, $5, $6)
        `;
        const values = [name, email, hashedPassword, career_interest, skill_level, time_commitment];
        pool.query(query, values, (err) => {
            if (err) {
                if (err.code === '23505') { // PostgreSQL error code for unique violation
                    return res.status(409).json({ success: false, message: 'Email already exists.' });
                }
                console.error('Database error during signup:', err);
                return res.status(500).json({ success: false, message: 'Database error.' });
            }

            console.log(`User registered: ${name} (${email})`);
            res.status(201).json({
                success: true,
                message: 'User registered successfully!',
                redirectUrl: `/general-dashboard.html?career=${career_interest.replace(/\s+/g, '-')}`,
                user: {
                    name,
                    career_interest: career_interest.replace(/\s+/g, '-'),
                },
            });
        });
    } catch (error) {
        console.error('Server error during signup:', error);
        res.status(500).json({ success: false, message: 'Server error.' });
    }
});

// Login Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email and password are required.' });
    }

    try {
        const query = 'SELECT * FROM users WHERE email = $1'; // Changed table name from users to roadmap_users
        const values = [email];
        pool.query(query, values, async (err, result) => {
            if (err) {
                console.error('Database error during login:', err);
                return res.status(500).json({ success: false, message: 'Database error.' });
            }

            if (result.rows.length === 0) {
                return res.status(404).json({ success: false, message: 'User not found.' });
            }

            const user = result.rows[0];
            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(401).json({ success: false, message: 'Invalid password.' });
            }

            console.log(`User logged in: ${user.name} (${user.email})`);
            res.status(200).json({
                success: true,
                message: 'Login successful!',
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    career_interest: user.career_interest,
                    skill_level: user.skill_level,
                    time_commitment: user.time_commitment
                }
            });
        });
    } catch (error) {
        console.error('Server error during login:', error);
        res.status(500).json({ success: false, message: 'Server error.' });
    }
});


// Profile Route
router.get('/profile', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const query = 'SELECT name, email, career_interest, skill_level, time_commitment FROM users WHERE id = $1';
        const values = [userId];
        const result = await pool.query(query, values);

        if (result.rowCount === 0) {
            return res.status(404).json({ success: false, message: 'User not found.' });
        }

        const user = result.rows[0];
        res.status(200).json({ success: true, user });
    } catch (error) {
        console.error('Server error during profile retrieval:', error);
        res.status(500).json({ success: false, message: 'Server error.' });
    }
});


// Profile Update Route
router.put('/profile', authenticateToken, async (req, res) => {
    const { name, email, career_interest, skill_level, time_commitment } = req.body;

    if (!name || !email || !career_interest || !skill_level || !time_commitment) {
        return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    try {
        const userId = req.user.id;
        const query = `
            UPDATE users
            SET name = $1, email = $2, career_interest = $3, skill_level = $4, time_commitment = $5
            WHERE id = $6
        `;
        const values = [name, email, career_interest, skill_level, time_commitment, userId];
        const result = await pool.query(query, values);

        if (result.rowCount === 0) {
            return res.status(404).json({ success: false, message: 'User not found.' });
        }

 
        console.log(`Profile updated: ${name} (${email})`);
        res.status(200).json({ success: true, message: 'Profile updated successfully!' });
    } catch (error) {
        console.error('Server error during profile update:', error);
        res.status(500).json({ success: false, message: 'Server error.' });
    }
});

module.exports = router;