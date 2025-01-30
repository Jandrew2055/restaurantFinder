import React from 'react';
import { useState, useEffect } from 'react';
import DisplayRestaurants from './Components/DisplayRestaurants.jsx';
import NavBar from './Components/NavBar.jsx';
import FooterBar from './Components/Footer.jsx';
import HeroSection from './Components/Hero.jsx';

const App = () => {
  const [userLocation, setUserLocation] = useState({
    latitude: 40.7549,
    longitude: -73.984,
  }); //have predefined location set to NYC midtown

  const [restaurantData, setRestaurantData] = useState(null); //will hold all of the restaurant data that is retrieved from the API

  // const [favoriteRestaurant, setFavoriteRestaurant] = useState({
  //   name: 'Jose',
  //   restaurantName: 'Tao',
  // }); //Holds the data for favorite restaurant chosen

  //grabs the user's location to then utilize the coordinates to get the restaurants near them
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        // console.log(position);
        const { latitude, longitude } = position.coords;
        setUserLocation({ latitude, longitude });
        console.log('Latitude: ', latitude);
        console.log('Longitude: ', longitude);
      }),
        (err) => {
          console.warn({ code: err.code, log: `ERROR: ${err}` });
        };
    } else {
      alert('Your browser does not support location');
    }
  };

  //OUTDATED YELP API
  //this function will grab restaurant info when button is clicked with proper filters (if any)
  // const grabRestaurantInfo = () => {
  //   fetch('/api', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       longitude: `${userLocation.longitude}`,
  //       latitude: `${userLocation.latitude}`,
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setRestaurantData(data);
  //       console.log(data);
  //     });
  // };

  //this will add restaurant to list of favorites in MongoDB
  const addToFavorites = (firstName, lastName, restaurantName) => {
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
      <HeroSection addToFavorites={addToFavorites}></HeroSection>
      <DisplayRestaurants
        getUserLocation={getUserLocation}
        restaurantData={restaurantData}
        grabRestaurantInfo={grabRestaurantInfo}
      ></DisplayRestaurants>
      <FooterBar></FooterBar>
    </div>
  );
};
export default App;
