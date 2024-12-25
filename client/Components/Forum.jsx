import React from 'react';
import { useEffect, useState } from 'react';

//This is our forum page for users to be able to update favorite restaurants and talk about them
const Forum = () => {
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

  return (
    <div>
      <h1>Favorite Restaurants</h1>
      <ul>
        {favoriteRestaurantList.map((restaurant, index) => (
          <li key={restaurant._id}>
            <h3>
              {index + 1}: Restaurant Name: {restaurant.restaurantName}
            </h3>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Forum;
