const Tour = require('../model/tourModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getOverview = catchAsync(async (req, res, next) => {
  const tours = await Tour.find();

  res.status(200).render('overview', {
    title: 'All Tours',
    tours,
  });
});

exports.getTour = catchAsync(async (req, res, next) => {
  const { slug } = req.params;
  const tour = await Tour.findOne({ slug }).populate({
    path: 'reviews',
    fields: 'review rating user',
  });
  if (!tour) return next(new AppError('There is no tour with that name.', 404));
  res.status(200).render('tour', {
    title: `${tour.name} Tour`,
    tour,
  });
});

exports.getLoginForm = catchAsync(async (req, res, next) => {
  res
    .status(200)
    .set(
      'Content-Security-Policy',
      "script-src 'self' https://cdnjs.cloudflare.com/ajax/libs/axios/0.21.0/axios.min.js 'unsafe-inline' 'unsafe-eval';"
    )
    .render('login', {
      title: 'Log into your account',
    });
});

exports.getAccount = catchAsync((req, res, next) => {
  res.status(200).render('account', {
    title: 'Your Account',
  });
});
