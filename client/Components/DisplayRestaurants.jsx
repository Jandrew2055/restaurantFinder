import React from 'react';
import { URL, API_KEY } from '../../authentication';
import { useState, useEffect } from 'react';

const DisplayRestaurants = (props) => {
  //   const { latitude, longitude } = props.us;
  //will create cards from restaurants pulled from the public API
  //   let restaurantList = undefined;
  //   const [restaurantList, setRestaurantList] = useState();
  const [data, setData] = useState([]);
  // This is where the header lies (blueprint)
  const HEADER = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_KEY}`,
    },
  };
  const addedString = `?location=bronx&latitude=40.8&limit=10&sort_by=best_match`;

  //   console.log('latitude: ', latitude);
  //   console.log('longitude: ', longitude);

  // //  this is the one we want to use BELOWWWW
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

  //Here we are rendering all of the restaurant's information: name, price, address
  let restaurantList = data.map((restaurant) => {
    let address = '';

    for (let location of restaurant.location.display_address) {
      address += ` ${location}`;
    }

    // * <p>
    //       Allows for {restaurant.transactions[0]} and
    //       {restaurant.transactions[1] ? restaurant.transactions[1] : ''}
    //     </p> */
    return (
      <h2 key={restaurant.id}>
        Name:{restaurant.name} <img src={restaurant.image_url}></img>
        <p>Pricing: {restaurant.price}</p>
        <p>Rating: {restaurant.rating}/5</p>
        <p>Address: {address}</p>
      </h2>
    );
  });

  return (
    <div>
      <h1>Restaurant list</h1>
      <ul>{restaurantList}</ul>
    </div>
  );
};

export default DisplayRestaurants;
