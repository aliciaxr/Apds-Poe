const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Employee = require('../models/Employee');
const router = express.Router();

// Employee login route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const employee = await Employee.findOne({ username });
    if (!employee) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    console.log('Stored password hash:', employee.password);
    console.log('Entered password:', password);

    const isMatch = await bcrypt.compare(password, employee.password);
console.log('Password match result:', isMatch); // Logs result of bcrypt comparison
if (!isMatch) {
    console.log('Password does not match'); // Logs if password is incorrect
    return res.status(400).json({ message: 'Invalid credentials' });
}


    const token = jwt.sign({ id: employee._id }, 'shhSuperSecretKey123!', { expiresIn: '1h' });
    res.json({ token });
});

module.exports = router;
