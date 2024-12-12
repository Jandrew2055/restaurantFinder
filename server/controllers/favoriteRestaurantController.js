const favoriteRestaurantController = {};

//the middleware function for now will just be saving 'testing' to return to frontend
favoriteRestaurantController.getFavoriteRestaurants = (req, res, next) => {
  res.locals.testing = 'retrieving favorite restaurant';
  return next();
};

//the middleware function for now will just be saving 'testing' to return to frontend
favoriteRestaurantController.addFavoriteRestaurants = (req, res, next) => {
  res.locals.testing = 'added a favorite restaurant';
  return next();
};

module.exports = favoriteRestaurantController;
