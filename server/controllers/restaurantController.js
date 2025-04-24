// const { createWatchProgram } = require('typescript');
const Restaurants = require('../models/restaurantModel');
const dotenv = require('dotenv').config();

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

//do some research on google Places API

const restaurantController = {};

restaurantController.getRestaurants = async (req, res, next) => {
  const { latitude, longitude, typesOfRestaurants } = req.body;

  //makes all restaurants types lowercase and appends the information required
  const types = typesOfRestaurants.map(
    (type) => type.toLowerCase() + '_restaurant'
  );

  console.log('testing retrieval:', typesOfRestaurants);
  console.log('testing new array:', types);
  /*
  object will hold pairs of what is received from the client
  obj = {
    mexican: 'mexican_restaurant'
  }
    this allows to send the appropriate types to Google API
  */

  //body request to be sent with google places api request
  const body = {
    includedTypes: types,
    maxResultCount: 20,
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
  let delay = 0;

  //make a request to the API to grab the restaurant's photo
  for (const [restaurantId, photoResource] of Object.entries(photoObject)) {
    setTimeout(async () => {
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
      } catch (err) {
        console.log('error fetching from api:', err);
        // return next(err);
      }
    }, 0 + delay);
    delay += 500;
  }

  //ensures this gets calledd afterlast delay and not right away
  setTimeout(() => {
    // console.log('Testing photo object result:', photoObject);
    res.locals.photos = photoObject;
    return next();
  }, delay);
};

module.exports = restaurantController;
