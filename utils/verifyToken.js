const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const User = require('../models/userModel');
const AppError = require('./appError');
const catchAsync = require('./catchAsync');

const verifyToken = catchAsync(async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access.', 401)
    );
  }

  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError(
        'The user belonging to this token does no longer exist.',
        401
      )
    );
  }

  // // 4) Check if user changed password after the token was issued
  // if (currentUser.changedPasswordAfter(decoded.iat)) {
  //   return next(
  //     new AppError('User recently changed password! Please log in again.', 401)
  //   );
  // }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  // console.log(req.user);
  next();
});

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (!req.user)
      return next(
        new AppError('You are not logged in! Please log in to get access.', 401)
      );
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return next(
        new AppError('You are not authorized to perform this action!', 401)
      );
    }
  });
};

const verifyTokenAndAdmin = catchAsync(async (req, res, next) => {
  verifyToken(req, res, () => {
    if (!req.user)
      return next(
        new AppError('You are not logged in! Please log in to get access.', 401)
      );
    if (req.user.isAdmin) {
      next();
    } else {
      return next(
        new AppError('You are not authorized to perform this action!', 401)
      );
    }
  });
});

module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
};
