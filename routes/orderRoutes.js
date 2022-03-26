const express = require('express');
const {
  verifyTokenAndAuthorization,
  verifyToken,
  verifyTokenAndAdmin,
} = require('../utils/verifyToken');

const {
  createOrder,
  updateOrder,
  deleteOrder,
  getOrders,
  getAllOrders,
  getMonthlyIncome,
} = require('../controllers/orderController');

const router = express.Router();

router.get('/income', verifyTokenAndAdmin, getMonthlyIncome);

router.get('/find/:userId', verifyTokenAndAuthorization, getOrders);

router.route('/').post(createOrder);
router
  .route('/:id')
  .patch(verifyTokenAndAdmin, updateOrder)
  .delete(verifyTokenAndAdmin, deleteOrder)
  .get(verifyTokenAndAdmin, getAllOrders);

module.exports = router;
