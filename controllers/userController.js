const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

// UPDATE USER
exports.updateUser = catchAsync(async (req, res, next) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SECRET
    ).toString();
  }

  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    user: updatedUser,
  });
});

// DELETE USER
exports.deleteUser = catchAsync(async (req, res, next) => {
  const deletedUser = await User.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: 'success',
    message: 'user deleted successfully',
    user: deletedUser,
  });
});

// -------------------ADMIN SPECIFIC ROUTES---------------------

// GET USER
exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) return next(new AppError('No user found with that ID', 404));
  user.password = undefined;
  res.status(200).json({
    status: 'success',
    user,
  });
});

// GET ALL USERS
exports.getAllUsers = catchAsync(async (req, res, next) => {
  const query = req.query.new;

  // RECENT 5 USERS
  const users = query
    ? await User.find().sort({ _id: -1 }).limit(5)
    : await User.find();
  res.status(200).json({
    status: 'success',
    result: users.length,
    users,
  });
});

// GET USER STATS: TOTAL USERS JOINED IN FROM THE LAST YEAR AND TOTAL USERS JOINED IN EACH MONTH
exports.getUserStats = catchAsync(async (req, res, next) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  const stats = await User.aggregate([
    { $match: { createdAt: { $gte: lastYear } } },
    {
      $project: {
        month: { $month: '$createdAt' },
      },
    },
    {
      $group: {
        _id: '$month',
        total: { $sum: 1 },
      },
    },
  ]);

  res.status(200).json({
    status: 'success',
    stats,
  });
});
