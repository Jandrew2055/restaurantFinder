const restaurantController = {};

restaurantController.getRestaurants = (req, res, next) => {
  res.locals.restaurants = 'getting all restaurants';
  next();
};

module.exports = restaurantController;
