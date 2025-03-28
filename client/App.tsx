// import * as React from 'react';
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
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // console.log(position);
          console.log('location data:', position);
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });

          //CAN BE DELETED BELOW, JUST TESTING
          // console.log('Latitude: ', latitude);
          // console.log('Longitude: ', longitude);
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
  const grabRestaurantInfo = async () => {
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

    //BELOW is what we will send if we send over coordinates from the front end, a refactor later
    // try {
    //   //sends a request to the backend, with user's location(if any)

    //   const response = await fetch('/api', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       longitude: `${userLocation.longitude}`,
    //       latitude: `${userLocation.latitude}`,
    //     }),
    //   });
    //   const data = await response.json();
    //   console.log(data);
    // } catch {
    //   //otherwise throw error
    //   throw new Error('Error getting data');
    // }

    console.log('test');
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
