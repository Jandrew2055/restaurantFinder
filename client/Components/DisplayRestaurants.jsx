import React from 'react';
import { URL, API_KEY } from '../../authentication';
import { useState, useEffect } from 'react';

const DisplayRestaurants = () => {
  //will create cards from restaurants pulled from the public API
  //   let restaurantList = undefined;
  //   const [restaurantList, setRestaurantList] = useState();
  const [data, setData] = useState([]);
  // This is where the header lies (blueprint)
  const HEADER = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_KEY}`,
    },
  };

  const addedString = '?location=NYC&limit=10';

  // //  this is the one we want to use BELOWWWW
  useEffect(() => {
    fetch(`${URL}${addedString}`, HEADER)
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        console.log(data.businesses[0].name);
        setData(data.businesses);
      });
  }, []);

  //Here we are rendering all of the restaurant's information: name, price, address
  let restaurantList = data.map((restaurant) => {
    let address = '';
    for (let location of restaurant.location.display_address) {
      address += ` ${location}`;
    }
    return (
      <h2 key={restaurant.id}>
        Name:{restaurant.name} <img src={restaurant.image_url}></img>
        <p>Pricing: {restaurant.price}</p>
        <p>Rating: {restaurant.rating}/5</p>
        <p>Address: {address}</p>
      </h2>
    );
  });

  return (
    <div>
      <h1>Restaurant list</h1>
      <ul>{restaurantList}</ul>
    </div>
  );
};

export default DisplayRestaurants;
