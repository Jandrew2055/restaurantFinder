import React, { useState, useEffect } from 'react';
import Checkbox from './Checkbox';

const DisplayRestaurants = (props) => {
  //collect restaurant list from parent component
  const { restaurantData } = props;
  const [restaurantPhotos, setRestaurantPhotos] = useState({});

  //this list will be passed down to child to be used to render checkboxes
  const list = ['Mexican', 'Italian', 'Carribean', 'Thai'];

  //this function will allow you to add this restaurant to list of favorites
  const addRestaurantToFavorites = async (id) => {
    console.log('adding restaurant to favorites', id);
  };

  //function to grab restaurant photos
  const grabRestaurantPhoto = async (photoResource) => {
    //send the restaurant Id to grab the photo from the API for each restaurant
    try {
      const response = await fetch('/api/photo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          photoResource,
        }),
      });
      //if response from the fetching using API is not valid throw error
      if (!response.ok) {
        throw new Error('Error with response!');
      }
      const data = await response.json();
      return data.photoUri;
    } catch (err) {
      console.log('error grabbing photos from server:', err);
    }
  };

  //saves photoURI in state to access afterwards (runs the function above)
  useEffect(() => {
    if (!restaurantData) return;

    // Fetch photos for all restaurants when restaurantData changes
    restaurantData.forEach(async (restaurant, index) => {
      setTimeout(async () => {
        const result = await grabRestaurantPhoto(restaurant.photos[0].name);

        setRestaurantPhotos((prevPhotos) => ({
          ...prevPhotos,
          [restaurant.id]: result, // Set photo for this specific restaurant by its id
        }));
        //this ensures that each request happens after every 300ms
      }, index * 1000);
    });
  }, [restaurantData]);

  let restaurantList;
  //Here we are rendering all of the restaurant's information: name, price, address
  if (restaurantData) {
    //grab the restaurant data from parent
    restaurantList = restaurantData.map((restaurant) => {
      //use the restaurant name and grab the image

      //fetch photo for restaurant using restaurant Id
      const photoUri = restaurantPhotos[restaurant.id];

      //for each restaurant, grab the Name, Pricing, Rating, Address & Directions
      let price = '';
      if (restaurant.priceRange && restaurant.priceRange.endPrice) {
        //format the pricing for the restaurant
        price = `Average price between $${restaurant.priceRange.startPrice.units} and $${restaurant.priceRange.endPrice.units} per person.`;
      }

      //ONCE WE HAVE THE PLACES DETAILS API SET UP, WE CAN REQUEST IMAGE

      return (
        <li key={restaurant.id} className='restaurant-Card'>
          {photoUri ? (
            <img
              src={photoUri}
              alt={restaurant.displayName.text}
              className='restaurant-Image'
            ></img>
          ) : (
            <p>Loading photo...</p>
          )}
          <div className='restaurant-Details'>
            <h3>Name: {restaurant.displayName.text}</h3>
            <p>Pricing: {price}</p>
            <p>Rating: {restaurant.rating}/5</p>
            <p>Address: {restaurant.formattedAddress}</p>
            <a
              href={`${restaurant.googleMapsLinks.directionsUri}`}
              target='_blank'
            >
              Directions Here
            </a>
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
      <Checkbox list={list} />
      <input type='checkbox' id='spanish' name='spanish'></input>

      <button onClick={props.getUserLocation}> Near Me</button>
      <button onClick={props.grabRestaurantInfo}>
        Refresh List of Restaurants
      </button>
      <ul>{restaurantList}</ul>
    </div>
  );
};

export default DisplayRestaurants;
