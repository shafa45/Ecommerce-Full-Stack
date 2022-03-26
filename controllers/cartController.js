const Cart = require('../models/cartModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

// CREATE Cart
exports.createCart = catchAsync(async (req, res, next) => {
  const newCart = await Cart.create(req.body);
  res.status(201).json({
    status: 'success',
    cart: newCart,
  });
});

// UPDATE Cart
exports.updateCart = catchAsync(async (req, res, next) => {
  const updatedCart = await Cart.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    cart: updatedCart,
  });
});

// DELETE Cart
exports.deleteCart = catchAsync(async (req, res, next) => {
  const deletedCart = await Cart.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: 'success',
    message: 'Cart deleted successfully',
  });
});

//  GET USER CART
exports.getCart = catchAsync(async (req, res, next) => {
  if (!req.params.userId) return next(new AppError('No user ID provided', 404));

  const cart = await Cart.findOne({
    userId: req.params.userId,
  });

  if (!cart) return next(new AppError('No cart found with that ID', 404));

  res.status(200).json({
    status: 'success',
    cart,
  });
});

// GET ALL Carts
exports.getAllCarts = catchAsync(async (req, res, next) => {
  const carts = await Cart.find();
  res.status(200).json({
    result: carts.length,
    status: 'success',
    carts,
  });
});
