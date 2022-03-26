const Product = require('../models/productModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

// CREATE PRODUCT
exports.createProduct = catchAsync(async (req, res, next) => {
  const newProduct = await Product.create(req.body);
  res.status(201).json({
    status: 'success',
    product: newProduct,
  });
});

// UPDATE PRODUCT
exports.updateProduct = catchAsync(async (req, res, next) => {
  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    status: 'success',
    product: updatedProduct,
  });
});

// // DELETE PRODUCT
exports.deleteProduct = catchAsync(async (req, res, next) => {
  const deletedProduct = await Product.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: 'success',
    message: 'product deleted successfully',
  });
});

//  GET PRODUCT
exports.getProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) return next(new AppError('No product found with that ID', 404));

  res.status(200).json({
    status: 'success',
    product,
  });
});

// GET ALL PRODUCTS
exports.getAllProducts = catchAsync(async (req, res, next) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;

  let products;
  if (qNew) {
    products = await Product.find().sort({ createdAt: -1 }).limit(1);
  } else if (qCategory) {
    products = await Product.find({
      categories: {
        $in: [qCategory],
      },
    });
  } else {
    products = await Product.find();
  }
  res.status(200).json({
    status: 'success',
    result: products.length,
    products,
  });
});
