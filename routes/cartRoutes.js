const express = require('express');

const {
  verifyToken,
  verifyTokenAndAuthorization,
} = require('../utils/verifyToken');

const {
  createCart,
  updateCart,
  deleteCart,
  getCart,
  getAllCarts,
} = require('../controllers/cartController');

const router = express.Router();

router.route('/').post(verifyToken, createCart);
router
  .route('/:id')
  .patch(verifyTokenAndAuthorization, updateCart)
  .delete(verifyTokenAndAuthorization, deleteCart)
  .get(verifyToken, getAllCarts);

router.get('/find/:userId', getCart);

module.exports = router;
