// import * as React from 'react';
import { useState, useEffect, FormEvent } from 'react';
import DisplayRestaurants from './Components/DisplayRestaurants.jsx';
import NavBar from './Navigation/NavBar.jsx';
import FooterBar from './Components/Footer.jsx';
import HeroSection from './Components/Hero.jsx';

//this list will be passed down to child to be used to render checkboxes
const foodType = [
  { id: 0, name: 'Mexican', state: false },
  { id: 1, name: 'Italian', state: false },
  { id: 2, name: 'Carribean', state: false },
  { id: 3, name: 'Thai', state: false },
];

const App = () => {
  //have predefined location set to NYC midtown
  const [userLocation, setUserLocation] = useState({
    latitude: 40.7549,
    longitude: -73.984,
  });

  //will hold all of the restaurant data that is retrieved from the API
  const [restaurantData, setRestaurantData] = useState(null);
  const [foodTypeFilter, setFoodTypeFilter] = useState(() => foodType);

  // const [favoriteRestaurant, setFavoriteRestaurant] = useState({
  //   name: 'Jose',
  //   restaurantName: 'Tao',
  // }); //Holds the data for favorite restaurant chosen

  //grabs the user's location to then utilize the coordinates to get the restaurants near them
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // console.log(position);
          // console.log('location data:', position);
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
        },
        (err: GeolocationPositionError) => {
          console.warn({ code: err.code, log: `ERROR: ${err}` });
        },
        { enableHighAccuracy: true }
      );
    } else {
      alert('Your browser does not support location');
    }
  };

  //UPDATED GOOGLE PLACES API below
  const grabRestaurantInfo = async (event: FormEvent) => {
    event.preventDefault();
    try {
      //make a call to the api
      const response = await fetch('/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          longitude: `${userLocation.longitude}`,
          latitude: `${userLocation.latitude}`,
        }),
      });

      if (!response.ok)
        //if response received is not okay, throw error
        throw new Error(`Error sending request to api:${response}`);
      const data = await response.json();

      setRestaurantData(data.places);

      //THIS IS JUST TO TEST WHAT WE GET BACK, CAN BE DELETED
      data.places.forEach((restaurant: any) => {
        console.log('restaurant:', restaurant.displayName.text);
      });
    } catch (error) {
      throw new Error(`Error sending request to api:${error}`);
    }
  };

  //this will add restaurant to list of favorites in MongoDB
  const addToFavorites = (
    firstName: string,
    lastName: string,
    restaurantName: string
  ) => {
    //function takes in three arguments and we use them below
    let name = firstName; //name of user is firstName assuming no lastName was inputted

    if (lastName) name += ` ${lastName}`; //otherwise append lastName here

    //fetch request to the server to update in database favorite restaurant
    fetch('/favoriteForum', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: `${name}`,
        restaurantName: `${restaurantName}`,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  return (
    <div>
      <HeroSection></HeroSection>
      <DisplayRestaurants
        getUserLocation={getUserLocation}
        restaurantData={restaurantData}
        foodType={foodType}
        setFoodTypeFilter={setFoodTypeFilter}
        grabRestaurantInfo={grabRestaurantInfo}
      ></DisplayRestaurants>
      <FooterBar></FooterBar>
    </div>
  );
};
export default App;
