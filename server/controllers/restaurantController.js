// const { createWatchProgram } = require('typescript');
const Restaurants = require('../models/restaurantModel');
const dotenv = require('dotenv').config();

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

//do some research on google Places API

const restaurantController = {};

restaurantController.getRestaurants = async (req, res, next) => {
  const { latitude, longitude } = req.body;

  //body request to be sent with google places api request
  const body = {
    includedTypes: ['restaurant'],
    maxResultCount: 10,
    locationRestriction: {
      circle: {
        center: {
          latitude: latitude || 40.7549,
          longitude: longitude || -73.984,
        },
        radius: 500.0,
      },
    },
  };

  //fetches data using google places api, and returns to user
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
            'places.name',
            'places.displayName',
            'places.formattedAddress',
            'places.priceRange',
            'places.rating',
            'places.googleMapsLinks',
            'places.photos',
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

    return next();
  } catch (error) {
    //if fetch call in the server-side fails, throw error
    throw new Error(`Error fetching information from Google API:${error}`);
  }
};

restaurantController.getPhoto = async (req, res, next) => {
  const { photoResource } = req.body;

  console.log('TESTING photo resource:', photoResource.trim());

  // media?maxHeightPx=400&maxWidthPx=400&key=API_KEY

  const URL = `https://places.googleapis.com/v1/${photoResource}/media?maxHeightPx=400&maxWidthPx=400&key=${GOOGLE_API_KEY}&skipHttpRedirect=true`;

  //make a request to the API to grab the restaurant's photo
  // const URL = `https://places.googleapis.com/v1/places/${restaurantId}`;

  try {
    const response = await fetch(URL);
    if (!response.ok) {
      throw new Error('Failed to fetch photo');
    }
    //parse response using .json()
    const data = await response.json();

    // const photoUri = data.photoUri;

    // console.log('TESTING PHOTO Results', data.photoUri);

    // console.log('response from api fetching:', response);
    // // const data = await response.json();
    // console.log('TESTING DATA RESULTS:', data);

    // console.log('photoUrl:', response);

    res.locals.photo = data;

    return next();
  } catch (err) {
    console.log('error fetching from api:', err);
    return next(err);
  }
  // return next();
};

module.exports = restaurantController;
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