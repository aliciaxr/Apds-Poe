const express = require('express');
const Transaction = require('../models/Transaction');
const router = express.Router();
const authMiddleware = require('../middleware/auth');

// Payment route (customers make payment requests)
router.post('/pay', authMiddleware, async (req, res) => {
    const { amount, currency, payeeAccount, swiftCode } = req.body; // data required 

    // Validate required fields
    if (!amount || !currency || !payeeAccount || !swiftCode) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Create new transaction in db 
        const newTransaction = new Transaction({
            customerId: req.customerId, 
            amount,
            currency,
            payeeAccount,
            swiftCode,
            status: 'pending' // default status, wait for verification from employee
        });

        await newTransaction.save();
        // If successful 
        res.status(201).json({ message: 'Payment transaction successful', transaction: newTransaction });
    } catch (error) {
        // If unsuccessful
        res.status(500).json({ message: 'Payment transaction failed', error: error.message });
    }
});

// Fetch all transactions route (accessible only by authenticated employees)
router.get('/transactions', authMiddleware, async (req, res) => {
    try {
        // Retrieve all transactions with a status of 'pending'
        const transactions = await Transaction.find({ status: 'pending' });
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching transactions', error: error.message });
    }
});

module.exports = router;

