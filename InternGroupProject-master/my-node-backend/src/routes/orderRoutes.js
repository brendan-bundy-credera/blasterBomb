// Order routes
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.post('/', orderController.createOrder);
router.get('/user/:userId', orderController.getOrders);
router.get('/:orderId', orderController.getOrder);

module.exports = router;
