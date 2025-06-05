const express = require('express');
const router = express.Router();

// Define a sample route
router.get('/example', (req, res) => {
    res.json({ message: 'This is an example response' });
});

// Export the function to set up routes
module.exports = (app) => {
    app.use('/api', router);
};