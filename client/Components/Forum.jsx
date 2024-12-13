import React from 'react';
import { useEffect, useState } from 'react';

const Forum = () => {
  const [favoriteRestaurantList, setFavoriteRestaurantList] = useState([]);
  let favoritesList = null;

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
