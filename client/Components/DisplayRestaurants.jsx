import React from 'react';
import { URL, API_KEY } from '../../authentication';
import { useState, useEffect } from 'react';

const DisplayRestaurants = (props) => {
  const { restaurantData } = props;
  let restaurantList;

  //this function will allow you to add this restaurant to list of favorites
  const addRestaurantToFavorites = (id) => {
    console.log('adding restaurant to favorites', id);
  };
  //Here we are rendering all of the restaurant's information: name, price, address
  if (restaurantData) {
    restaurantList = restaurantData.businesses.map((restaurant) => {
      let address = '';
      //organizes the address appropriately
      for (let location of restaurant.location.display_address) {
        address += ` ${location}`;
      }

      return (
        <li key={restaurant.id} className='restaurant-Card'>
          <img
            src={restaurant.image_url}
            alt={restaurant.name}
            className='restaurant-Image'
          ></img>
          <div className='restaurant-Details'>
            <h3>Name: {restaurant.name}</h3>
            <p>Pricing: {restaurant.price}</p>
            <p>Rating: {restaurant.rating}/5</p>
            <p>Address: {address}</p>
          </div>
          <button
            onClick={() => {
              addRestaurantToFavorites(restaurant.id);
            }}
          >
            Add To Favorites
          </button>
        </li>
      );
    });
  }

  return (
    <div>
      <h1>Restaurant List</h1>
      <button onClick={props.getUserLocation}> Near Me</button>
      <button onClick={props.grabRestaurantInfo}>
        Refresh List of Restaurants
      </button>
      <ul>{restaurantList}</ul>
    </div>
  );
};

export default DisplayRestaurants;

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
