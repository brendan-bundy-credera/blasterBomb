// Cart routes
const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.get('/:userId', cartController.getCart);
router.post('/item', cartController.addItem);
router.put('/item/:itemId', cartController.updateItem);
router.delete('/item/:itemId', cartController.removeItem);

module.exports = router;
