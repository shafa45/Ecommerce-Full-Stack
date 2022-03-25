const express = require('express');
const {
  updateUser,
  deleteUser,
  getUser,
  getAllUsers,
  getUserStats,
} = require('../controllers/userController');
const router = express.Router();

const {
  verifyTokenAndAuthorization,
  verifyToken,
  verifyTokenAndAdmin,
} = require('../utils/verifyToken');

router.route('/').get(verifyTokenAndAdmin, getAllUsers);
router.route('/stats').get(verifyTokenAndAdmin, getUserStats);

router
  .route('/:id')
  .patch(verifyTokenAndAuthorization, updateUser)
  .delete(verifyTokenAndAuthorization, deleteUser)
  .get(verifyTokenAndAdmin, getUser);

module.exports = router;
