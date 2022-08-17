const express = require('express');
const {
  getAllTours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
  aliasTop5Tours,
  getTourStats,
  getMonthlyPlan,
} = require('../controller/tourController');

const { protect, restrictTo } = require('../controller/authController');

const router = express.Router();
router.route('/top-5-tours').get(aliasTop5Tours, getAllTours);
router.route('/tour-stats').get(getTourStats);
router.route('/monthly-plan/:year').get(getMonthlyPlan);

router.route('/').get(protect, getAllTours).post(createTour);
router
  .route('/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(protect, restrictTo('lead-guide', 'admin'), deleteTour);

module.exports = router;
