const express = require('express');
const restaurantController = require('../controllers/restaurantController');

const router = express.Router();

router.get('/', restaurantController.getRestaurants, (req, res) => {
  return res.send(res.locals.restaurants);
});

module.exports = router;
