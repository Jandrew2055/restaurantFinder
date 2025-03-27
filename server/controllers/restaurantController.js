// const { createWatchProgram } = require('typescript');
const Restaurants = require('../models/restaurantModel');
const dotenv = require('dotenv').config();

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

//do some research on google Places API

const restaurantController = {};

restaurantController.getRestaurants = async (req, res, next) => {
  //this successfully prints google api key

  const body = {
    includedTypes: ['restaurant'],
    maxResultCount: 20,
    locationRestriction: {
      circle: {
        center: {
          latitude: 40.7549,
          longitude: -73.984,
        },
        radius: 500.0,
      },
    },
  };
  //HEADER object
  // const Header = {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'X-Goog-Api-Key': API_KEY,
  //     'X-Goog-FieldMask': 'places.displayName',
  //   },
  //   body: {
  //     includedTypes: ['restaurant'],
  //     maxResultCount: 10,
  //     locationRestriction: {
  //       circle: {
  //         center: {
  //           latitude: 37.7937,
  //           longitude: -122.3965,
  //         },
  //         radius: 500.0,
  //       },
  //     },
  //   },
  // };

  try {
    const response = await fetch(
      'https://places.googleapis.com/v1/places:searchNearby',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': GOOGLE_API_KEY,
          'X-Goog-FieldMask': [
            'places.id',
            'places.displayName',
            'places.formattedAddress',
            'places.priceRange',
            'places.rating',
          ],
        },
        body: JSON.stringify(body),
      }
    );
    //if response received is not properly collected, throw error
    if (!response.ok) throw new Error(`Error with response:${response}`);

    //CAN BE DELETED BELOW JUST TESTING
    // console.log('testing api call');
    //if not proceed with collecting data received
    const data = await response.json();

    //save data received in res.locals
    res.locals.data = data;

    // data.places.forEach((element) => {
    //   console.log('restaurants:', element.displayName);
    // });

    //CAN BE DELETED BELOW JUST TO TEST
    console.log('this is the collected data server side:', data); //log it to console
    //continue with middleware function
    return next();
  } catch (error) {
    //if fetch call in the server-side fails, throw error
    throw new Error(`Error fetching information from Google API:${error}`);
  }

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
