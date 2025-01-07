import React from 'react';
import { useEffect, useState } from 'react';

//This is our forum page for users to be able to update favorite restaurants and talk about them
const Favorites = () => {
  //this will contain the favorite restaurant list retrieved from the database
  const [favoriteRestaurantList, setFavoriteRestaurantList] = useState([]);
  // let favoritesList = null;

  //makes a one time request to the database on render to retrieve favorite restaurants
  useEffect(() => {
    fetch('/favoriteForum')
      .then((res) => res.json())
      .then((data) => {
        setFavoriteRestaurantList(data);
      });
  }, []);

  //handle's the deletion of restaurant from favorites
  const deleteRestaurant = (id) => {
    //just prints the restaurant's id object
    console.log(id);
  };

  return (
    <div>
      <h1>Favorite Restaurants</h1>
      <h2>Restaurant Name</h2>
      <ul>
        {favoriteRestaurantList.map((restaurant) => (
          <li key={restaurant._id}>
            <h3>{restaurant.restaurantName}</h3>
            <button
              onClick={() => {
                //when clicked, it will pass restaurant id to function
                deleteRestaurant(restaurant._id);
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favorites;
