const express = require('express');
const router = express.Router();

// Transaction verification route
// Transaction verification route
router.post('/verify/:transactionId', async (req, res) => {
    const { transactionId } = req.params;
    try {
        await Transaction.findByIdAndUpdate(transactionId, { status: 'submitted' });
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error updating transaction status' });
    }
});

module.exports = router;
