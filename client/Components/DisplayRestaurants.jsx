import React from 'react';
import { URL, API_KEY } from '../../authentication';
import { useState, useEffect } from 'react';

const DisplayRestaurants = (props) => {
  const { restaurantData } = props;
  let restaurantList;
  //   const data = restaurantData.businesses;
  //   console.log('latitude: ', latitude);
  //   console.log('longitude: ', longitude);

  //   this is the one we want to use BELOWWWW
  //   useEffect(() => {
  //     fetch(`${URL}${addedString}`, HEADER)
  //       .then((res) => {
  //         console.log(res);
  //         return res.json();
  //       })
  //       .then((data) => {
  //         console.log(data.businesses[0].name);
  //         setData(data.businesses);
  //       });
  //   }, [props.userLocation]);

  //Here we are rendering all of the restaurant's information: name, price, address
  if (restaurantData) {
    restaurantList = restaurantData.businesses.map((restaurant) => {
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
  }

  return (
    <div>
      <h1>Restaurant list</h1>
      <button onClick={props.grabRestaurantInfo}>
        Refresh List of Restaurants
      </button>
      <ul>{restaurantList}</ul>
    </div>
  );
};

export default DisplayRestaurants;
