const express = require('express');
const favoriteRestaurantController = require('../controllers/favoriteRestaurantController');

const router = express.Router();

//router routes the requests to middleware function, and then back to frontend
router.get(
  '/',
  favoriteRestaurantController.getFavoriteRestaurants,
  (req, res) => {
    return res.json(res.locals.testing);
  }
);

//router routes the requests to middleware function, and then back to frontend
router.post(
  '/',
  favoriteRestaurantController.addFavoriteRestaurants,
  (req, res) => {
    return res.json(res.locals.testing);
  }
);

module.exports = router;
