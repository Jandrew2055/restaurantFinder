const restaurantController = {};

restaurantController.getRestaurants = (req, res, next) => {
  res.locals.restaurants = 'Testing new restaurants';
  next();
};

module.exports = restaurantController;
