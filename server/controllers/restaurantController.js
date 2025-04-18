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

restaurantController.getPhotos = async (req, res, next) => {
  const { photoObject } = req.body; //grab object containing all restaurant ids and photoResource

  // media?maxHeightPx=400&maxWidthPx=400&key=API_KEY

  //make a request to the API to grab the restaurant's photo
  // const URL = `https://places.googleapis.com/v1/places/${restaurantId}`;

  for (const [restaurantId, photoResource] of Object.entries(photoObject)) {
    console.log('restaurantId:', restaurantId);
    // console.log('photoResource:', photoResource);

    const URL = `https://places.googleapis.com/v1/${photoResource}/media?maxHeightPx=400&maxWidthPx=400&key=${GOOGLE_API_KEY}&skipHttpRedirect=true`;

    try {
      const response = await fetch(URL);
      if (!response.ok) {
        throw new Error('Failed to fetch photo');
      }
      //parse response using .json()
      const data = await response.json();
      //update object now with photoURI in the value for each restaurant
      photoObject[restaurantId] = data.photoUri;
      // const photoUri = data.photoUri;

      // console.log('TESTING PHOTO Results', data.photoUri);

      // console.log('response from api fetching:', response);
      // // const data = await response.json();
      // console.log('TESTING DATA RESULTS:', data);

      // console.log('photoUrl:', response);
    } catch (err) {
      console.log('error fetching from api:', err);
      // return next(err);
    }
  }
  console.log('testing photo object result:', photoObject);
  //return modified photoObject, now containing all restaurants and photos
  res.locals.photos = photoObject;
  return next();
};

module.exports = restaurantController;
