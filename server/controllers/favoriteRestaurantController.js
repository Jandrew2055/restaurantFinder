const favoriteRestaurantController = {};

favoriteRestaurantController.addRestaurant = (req, res, next) => {
  //the middleware function for now will just be saving 'testing' to return to frontend
  res.locals.testing = 'testing';
  return next();
};

module.exports = favoriteRestaurantController;
