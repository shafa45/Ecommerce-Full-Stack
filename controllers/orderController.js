const Order = require('../models/orderModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

// CREATE Order
exports.createOrder = catchAsync(async (req, res, next) => {
  const newOrder = await Order.create(req.body);
  res.status(201).json({
    status: 'success',
    order: newOrder,
  });
});

// UPDATE Order
exports.updateOrder = catchAsync(async (req, res, next) => {
  const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    order: updatedOrder,
  });
});

// DELETE Order
exports.deleteOrder = catchAsync(async (req, res, next) => {
  const deletedOrder = await Order.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: 'success',
    message: 'Order deleted successfully',
  });
});

//  GET USER ORDERS
exports.getOrders = catchAsync(async (req, res, next) => {
  if (!req.params.userId) return next(new AppError('No user ID provided', 404));

  const orders = await Orders.find({
    userId: req.params.userId,
  });

  res.status(200).json({
    result: orders.length,
    status: 'success',
    orders,
  });
});

// GET ALL Orders
exports.getAllOrders = catchAsync(async (req, res, next) => {
  const orders = await Order.find();
  res.status(200).json({
    result: orders.length,
    status: 'success',
    orders,
  });
});

// GET MONTHLY INCOME
exports.getMonthlyIncome = catchAsync(async (req, res, next) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  const income = await Order.aggregate([
    { $match: { createdAt: { $gte: previousMonth } } },
    {
      $project: {
        month: { $month: '$createdAt' },
        sales: '$amount',
      },
    },
    {
      $group: {
        _id: '$month',
        total: { $sum: '$sales' },
      },
    },
  ]);

  res.status(200).json({
    result: income.length,
    status: 'success',
    income,
  });
});
