const User = require('../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

// sendToken
const sendToken = (user, statusCode, res) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    // httpOnly: true,
  };

  // if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions);

  // Remove password from output
  user.password = undefined;
  user.token = token;

  res.status(statusCode).json({
    status: 'success',
    token,
    user,
  });
};

// REGISTER
exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SECRET
    ).toString(),
  });

  sendToken(newUser, 201, res);
});

// LOGIN
exports.login = catchAsync(async (req, res, next) => {
  const user = await User.findOne({
    username: req.body.username,
  });

  if (!user) {
    return next(new AppError('User not found', 404));
  }

  const hashedPassword = CryptoJS.AES.decrypt(
    user.password,
    process.env.PASS_SECRET
  );

  const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
  if (originalPassword !== req.body.password) {
    return next(new AppError('Invalid Credentails', 401));
  }

  sendToken(user, 200, res);

  // const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
  //   expiresIn: process.env.JWT_EXPIRES_IN,
  // });

  // // Remove password from output
  // user.password = undefined;

  // res.status(200).json({
  //   status: 'success',
  //   user,
  //   accessToken,
  // });
});
