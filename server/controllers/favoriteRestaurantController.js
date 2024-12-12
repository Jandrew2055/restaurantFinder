const Restaurants = require('../models/restaurantModel'); //model for CRUD

const favoriteRestaurantController = {};

//the middleware function for now will just be saving 'testing' to return to frontend
favoriteRestaurantController.getFavoriteRestaurants = (req, res, next) => {
  res.locals.testing = 'retrieving favorite restaurant';
  return next();
};

//the middleware function for now will just be saving 'testing' to return to frontend
favoriteRestaurantController.addFavoriteRestaurants = (req, res, next) => {
  console.log(req.body);
  const { name, restaurantName } = req.body;

  Restaurants.create({ name, restaurantName })
    .then((restaurant) => {
      res.locals.newRestaurant = restaurant;
      return next();
    })
    .catch((err) => {
      console.error({
        log: `Error adding new restaurant ${err}`,
        status: 500,
        message: { err: 'Failed to add restaurant' },
      });
    });
//   res.locals.testing = 'added a favorite restaurant';
//   return next();
};

module.exports = favoriteRestaurantController;
