const express = require('express');
const router = express.Router();

// Define a sample route
router.get('/example', (req, res) => {
    res.json({ message: 'This is an example response' });
});

// Export the router
module.exports = router;