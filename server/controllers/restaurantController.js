const Restaurants = require('../models/restaurantModel');
const dotenv = require('dotenv').config();

const API_KEY = process.env.GOOGLE_API_KEY;

//do some research on google Places API

const restaurantController = {};

restaurantController.getRestaurants = (req, res, next) => {
  //this successfully prints google api key
  console.log('api Key:', API_KEY);

  //EVERYTHING BELOW CAN BE DELETEDD, WILL HAVE TO BE REDONE WITH GOOGLE API

  // This is where the header lies (blueprint)
  // console.log(req.body);
  // const HEADER = {
  //   method: 'GET',
  //   headers: {
  //     accept: 'application/json',
  //     Authorization: `Bearer ${API_KEY}`,
  //   },
  // };

  // const { latitude, longitude } = req.body; // grab the coordinates of user sending request
  // //if user has not chosen his own coordinates, the chosen coordinates will be NYC
  // console.log('serverLatitude: ', latitude);
  // console.log('serverLongitude: ', longitude);
  // //This will be the added portion to the fetch request to make it more accurate
  // const addedString = `?latitude=${latitude}&longitude=${longitude}&sort_by=best_match&limit=20`;

  // fetch(`${URL}${addedString}`, HEADER)
  //   .then((res) => {
  //     console.log(res);
  //     return res.json();
  //   })
  //   .then((data) => {
  //     console.log(data);
  //     res.locals.restaurants = data;
  //   })
  //   .then(() => {
  //     return next();
  //   });
};

module.exports = restaurantController;
