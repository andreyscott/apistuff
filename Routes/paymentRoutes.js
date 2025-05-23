const express = require('express');
const router = express.Router();
// const paymentController = require('../controllers/paymentController');
const paymentController = require('../controlllers/paymentController');
const validatePayment = require('../middleware/validatePayment');

router.post('/', validatePayment, paymentController.initiatePayment);
router.get('/:id', paymentController.getPaymentStatus);

module.exports = router;