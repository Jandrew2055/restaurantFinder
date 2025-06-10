import React from 'react';
import { useEffect, useState } from 'react';

//This is our forum page for users to be able to update favorite restaurants and talk about them
const Favorites = () => {
  //this will contain the favorite restaurant list retrieved from the database
  const [favoriteRestaurantList, setFavoriteRestaurantList] = useState([]);
  // let favoritesList = null;

  //makes a one time request to the database on render to retrieve favorite restaurants
  useEffect(() => {
    /*
    Will refactor to store placeId from restaurants in database, and then use this 
    with Google's Place Details API to fetch these restaurants again and just
    show restaurant name along with address 
    */

    fetch('/favorites')
      .then((res) => res.json())
      .then((data) => {
        setFavoriteRestaurantList(data);
      });
  }, []);

  //WILL DELETE SINCE THIS FAVORITES PAGE WILL NOT BE USED FOR COMMENTING
  //allows you to edit the comment that is left next to each restaurant
  const editRestaurantExperience = (id) => {
    console.log(id);
    console.log('I will edit this restaurant information');
  };

  //THIS WILL BE REFACTORED TO DELETE PLACES ID FROM DATABASE instead
  //handle's the deletion of restaurant from favorites
  const deleteRestaurant = (id) => {
    //currently just prints the restaurant's id object
    console.log(id);
    console.log('I will delete this restaurant');
  };

  return (
    <div>
      <h1>Favorite Restaurants</h1>
      <h2>Restaurant Name</h2>
      <ul>
        {favoriteRestaurantList.map((restaurant) => (
          <li key={restaurant._id}>
            <h3>{restaurant.restaurantName}</h3>
            <button onClick={() => editRestaurantExperience(restaurant._id)}>
              edit
            </button>
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
