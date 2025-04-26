const db = require('../models/restaurantModel'); //model for CRUD

//controller object to hold separate middleware functions
const favoriteRestaurantController = {};

//the middleware function for now will just be saving 'testing' to return to frontend
favoriteRestaurantController.getFavoriteRestaurants = (req, res, next) => {
  db.find()
    .then((restaurants) => {
      console.log(restaurants);
      res.locals.favoriteRestaurants = restaurants;
    })
    .then(() => {
      return next();
    });

  //   (err, restaurants) => {
  //     console.log(restaurants);
  //   });
};

//the middleware function for now will just be saving 'testing' to return to frontend
favoriteRestaurantController.addFavoriteRestaurants = (req, res, next) => {
  // console.log(req.body);
  const { name, restaurantName } = req.body; //grabs the name of person and restaurant name from the request body
  console.log('name :', name);
  console.log('restauranteName: ', restaurantName);

  //having the details from the frontend, we can then create this in the database and
  //it will allow us to then retrieve all this info later from the database

  //will create a new 'favorite restaurant on the database
  db.create({ name, restaurantName })
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
};

module.exports = favoriteRestaurantController;
