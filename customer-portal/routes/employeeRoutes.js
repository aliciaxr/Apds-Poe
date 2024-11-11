const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Employee = require('../models/Employee');
const router = express.Router();

// regex patterns for validation
const usernameRegex = /^[a-zA-Z0-9]{3,20}$/; // Alphanumeric, 3-20 chars
const passwordRegex = /^[a-zA-Z0-9!@#$%^&*]{8,}$/; // Min 8 chars, letters, numbers, some specials

// Employee login route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Validate username and password using regex patterns
    if (!usernameRegex.test(username)) {
        return res.status(400).json({ message: 'Invalid username format' });
    }
    if (!passwordRegex.test(password)) {
        return res.status(400).json({ message: 'Invalid password format' });
    }

    const employee = await Employee.findOne({ username });
    if (!employee) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, employee.password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: employee._id }, 'shhSuperSecretKey123!', { expiresIn: '1h' });
    res.json({ token });
});

module.exports = router;
