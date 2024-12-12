const Restaurants = require('../models/restaurantModel');
const { URL, API_KEY } = require('../../authentication');

const restaurantController = {};

restaurantController.getRestaurants = (req, res, next) => {
  // This is where the header lies (blueprint)
  const HEADER = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_KEY}`,
    },
  };

  const addedString = `?location=bronx&latitude=40.8&limit=10&sort_by=best_match`;

  fetch(`${URL}${addedString}`, HEADER)
    .then((res) => {
      console.log(res);
      return res.json();
    })
    .then((data) => {
      console.log(data.businesses[0].name);
      res.locals.restaurants = data;
    })
    .then(() => {
      return next();
    });

  //   res.locals.restaurants = 'getting all restaurants';
  //   next();
};

module.exports = restaurantController;
