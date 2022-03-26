const express = require('express');
const {
  verifyTokenAndAuthorization,
  verifyToken,
  verifyTokenAndAdmin,
} = require('../utils/verifyToken');

const {
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getAllProducts,
} = require('../controllers/productController');

const router = express.Router();

router.get('/find/:id', getProduct);

router.route('/').post(verifyTokenAndAdmin, createProduct).get(getAllProducts);
router
  .route('/:id')
  .patch(verifyTokenAndAdmin, updateProduct)
  .delete(verifyTokenAndAdmin, deleteProduct);

module.exports = router;
