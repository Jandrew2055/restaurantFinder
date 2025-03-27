const express = require('express');
const restaurantController = require('../controllers/restaurantController');

const router = express.Router();



router.get('/', restaurantController.getRestaurants, (req, res) => {
  return res.status(200).json(res.locals.data);
});

module.exports = router;
