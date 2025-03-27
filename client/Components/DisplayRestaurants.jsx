import React from 'react';

const DisplayRestaurants = (props) => {
  //collect restaurant list from parent component
  const { restaurantData } = props;
  console.log(restaurantData);
  let restaurantList;

  //this function will allow you to add this restaurant to list of favorites
  const addRestaurantToFavorites = (id) => {
    console.log('adding restaurant to favorites', id);
  };
  //Here we are rendering all of the restaurant's information: name, price, address
  if (restaurantData) {
    restaurantList = restaurantData.map((restaurant) => {
      let price = '';
      if (restaurant.priceRange && restaurant.priceRange.endPrice) {
        //format the pricing for the restaurant
        price = `Average price between $${restaurant.priceRange.startPrice.units} and $${restaurant.priceRange.endPrice.units}`;
      }

      //ONCE WE HAVE THE PLACES DETAILS API SET UP, WE CAN REQUEST IMAGE
      // <img
      //   src={restaurant.photos[0]}
      //   alt={restaurant.displayName.text}
      //   className='restaurant-Image'
      // ></img>;
      return (
        <li key={restaurant.id} className='restaurant-Card'>
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
      <button onClick={props.getUserLocation}> Near Me</button>
      <button onClick={props.grabRestaurantInfo}>
        Refresh List of Restaurants
      </button>
      <ul>{restaurantList}</ul>
    </div>
  );
};

export default DisplayRestaurants;

//   this is the one we want to use BELOWWWW
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
