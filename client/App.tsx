// import * as React from 'react';
import { useState, useEffect, FormEvent } from 'react';
import DisplayRestaurants from './Components/DisplayRestaurants.jsx';
import NavBar from './Navigation/NavBar.jsx';
import FooterBar from './Components/Footer.jsx';
import HeroSection from './Components/Hero.jsx';
import { get } from 'mongoose';

//this list will be passed down to child to be used to render checkboxes
const foodType = [
  { id: 0, name: 'Mexican', state: false },
  { id: 1, name: 'Italian', state: false },
  { id: 2, name: 'Ramen', state: false },
  { id: 3, name: 'Korean', state: false },
  { id: 4, name: 'Asian', state: false },
  { id: 5, name: 'Vietnamese', state: false },
  { id: 6, name: 'Middle_Eastern', state: false },
];

const App = () => {
  //will hold all of the restaurant data that is retrieved from the API
  const [restaurantData, setRestaurantData] = useState(null);
  const [foodTypeFilter, setFoodTypeFilter] = useState(() => foodType);

  //grabs the user's location to then utilize the coordinates to get the restaurants near them
  const getUserLocation = async () => {
    return new Promise<{ latitude: number; longitude: number }>(
      (resolve, reject) => {
        if (!navigator.geolocation) {
          reject(new Error('Geolocation not supported'));
          return;
        }

        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const { latitude, longitude } = pos.coords;
            resolve({ latitude, longitude });
          },
          (err) => reject(err),
          { enableHighAccuracy: true }
        );
      }
    );
  };

  //UPDATED GOOGLE PLACES API below
  const grabRestaurantInfo = async (event: FormEvent) => {
    event.preventDefault();

    //array containing the checked boxes of restaurants, filters the ones that are checked off
    const typesOfRestaurants = foodTypeFilter
      .filter((type) => type.state === true)
      .map((type) => type.name);

    //default location values for NYC incase geolocation does not function
    let latitude = 40.7549;
    let longitude = -73.984;
    try {
      //grabbing the latitude and longitude from getUserLocation function
      const location = await getUserLocation();
      //destructuring and assigning to existing variables
      ({ latitude, longitude } = location);

      //CAN DELETE, SAME AS ABOVE
      // latitude = location.latitude;
      // longitude = location.longitude;
    } catch (err) {
      console.log('error fetching coordinates:', err);
    }

    try {
      //make a call to the api
      const response = await fetch('/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          longitude,
          latitude,
          typesOfRestaurants: typesOfRestaurants,
        }),
      });

      //if response received is not okay, throw error
      if (!response.ok)
        throw new Error(`Error sending request to api:${response}`);

      const data = await response.json();
      if (Object.keys(data).length === 0) return;
      // console.log('checking the data received:', data);
      else {
        setRestaurantData(data.places);
        //THIS IS JUST TO TEST WHAT WE GET BACK, CAN BE DELETED
        data.places.forEach((restaurant: any) => {
          console.log('restaurant:', restaurant.displayName.text);
        });
      }
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
        restaurantData={restaurantData}
        foodTypeFilter={foodTypeFilter}
        setFoodTypeFilter={setFoodTypeFilter}
        grabRestaurantInfo={grabRestaurantInfo}
      ></DisplayRestaurants>
      <FooterBar></FooterBar>
    </div>
  );
};
export default App;
