const express = require('express');

const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
// const productRouter = require('./routes/productRoutes');
const userRouter = require('./routes/userRoutes');
const authRouter = require('./routes/authRoutes');
// const orderRouter = require('./routes/orderRoutes');

const app = express();

require('dotenv').config();
// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Body parser, reading data from body into req.body
app.use(express.json());
// Cookie parser
app.use(cookieParser());

//  ROUTES
app.use('/api/v1/users', userRouter);
app.use('/api/v1/auth', authRouter);
// app.use('/api/v1/products', productRouter);
// app.use('/api/v1/orders', orderRouter);

// RANDOM URL WHICH IS NOT PRESENT IN OUR SERVER
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
