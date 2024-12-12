const express = require('express');
const favoriteRestaurantController = require('../controllers/favoriteRestaurantController');

const router = express.Router();

router.get('/', favoriteRestaurantController.addRestaurant, (req, res) => {
  //router routes the requests to middleware function, and then back to frontend
  return res.json(res.locals.testing);
});

module.exports = router;
