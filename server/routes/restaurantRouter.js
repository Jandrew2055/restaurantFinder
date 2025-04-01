const express = require('express');
const restaurantController = require('../controllers/restaurantController');

const router = express.Router();

router.post('/', restaurantController.getRestaurants, (req, res) => {
  return res.status(200).json(res.locals.data);
});

router.post('/photo', restaurantController.getPhoto, (req, res) => {
  return res.status(200).json(res.locals.photo);
});

module.exports = router;
