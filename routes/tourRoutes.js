const express = require('express');
const reviewRouter = require('./reviewRoutes');
const {
  getAllTours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
  aliasTop5Tours,
  getTourStats,
  getMonthlyPlan,
  getToursWithIn,
  getDistances,
} = require('../controller/tourController');

const { protect, restrictTo } = require('../controller/authController');

const router = express.Router();

router.use('/:tourId/reviews', reviewRouter);

router.route('/top-5-tours').get(aliasTop5Tours, getAllTours);
router.route('/tour-stats').get(getTourStats);

router
  .route('/monthly-plan/:year')
  .get(protect, restrictTo('lead-guide', 'admin', 'guide'), getMonthlyPlan);

router
  .route('/tours-within/:distance/center/:latlng/unit/:unit')
  .get(getToursWithIn);

router.route('/distances/:latlng/unit/:unit').get(getDistances);

router
  .route('/')
  .get(getAllTours)
  .post(protect, restrictTo('admin', 'lead-guide'), createTour);

router
  .route('/:id')
  .get(getTour)
  .patch(protect, restrictTo('lead-guide', 'admin'), updateTour)
  .delete(protect, restrictTo('lead-guide', 'admin'), deleteTour);

module.exports = router;
