import React from 'react';
import { URL, API_KEY } from '../../authentication';
import { useState, useEffect } from 'react';

const DisplayRestaurants = () => {
  //will create cards from restaurants pulled from the public API
  // const restaurantList =
  const HEADER = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_KEY}`,
    },
  };

  const addedString = '?location=NYC&limit=40';


  //makes a fetch request to grab the restaurants from yelp matching the limits
//   useEffect(() => {
//     fetch(`${URL}${addedString}`, HEADER)
//       .then((res) => {
//         console.log(res);
//         return res.json();
//       })
//       .then((data) => {
//         console.log('data retrieved: ', data);
//         for (let i = 0; i < data.businesses.length; i++) {
//           console.log(data.businesses[i].name);
//         }
//       });
//   }, []);

  return <div>Testing the cards that will be returned</div>;
};

export default DisplayRestaurants;
