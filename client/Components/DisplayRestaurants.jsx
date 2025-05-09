import React, { useState, useEffect } from 'react';
import Checkbox from './Checkbox';

const DisplayRestaurants = (props) => {
  //collect restaurant list from parent component
  const { restaurantData } = props;
  const [restaurantPhotos, setRestaurantPhotos] = useState({});

  //allow us to change state living in parent component
  const { foodTypeFilter, setFoodTypeFilter } = props;

  //changes status of checkbox for state
  const checkHandler = (event) => {
    const { id } = event.target;

    //maps through all items and updates state for the one that is clicked
    setFoodTypeFilter((prevState) =>
      prevState.map((item) => {
        //creates new object with previous item and updates the state inside
        return item.id === parseInt(id)
          ? { ...item, state: !item.state }
          : item;
      })
    );
  };

  //this function will allow you to add this restaurant to list of favorites
  const addRestaurantToFavorites = async (id) => {
    //make a request to the server (POST) sending the id in the body along with relevant info
    //like the restaurant name, address and so on.

    console.log('adding restaurant to favorites', id);
  };

  //function to grab restaurant photos
  const grabRestaurantPhotos = async (photoObject) => {
    //DO NOT DELETE
    //UNCOMMENT BELOW WHEN WANTING TO START FETCHING PHOTOS AGAIN (COST-SAVING)
    //send the restaurant Id to grab the photo from the API for each restaurant
    // try {
    //   const response = await fetch('/api/photo', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       photoObject,
    //     }),
    //   });
    //   //if response from the fetching using API is not valid throw error
    //   if (!response.ok) {
    //     throw new Error('Error with response!');
    //   }
    //   const data = await response.json();
    //   return data;
    //   // return data; //will return the data (all photos in object) from the server
    // } catch (err) {
    //   console.log('error grabbing photos from server:', err);
    // }
  };

  //saves photoURI in state to access afterwards (runs the function above)
  useEffect(() => {
    if (!restaurantData) return;

    //this is to make the fetching of photos asynchronous
    const fetchPhotos = async () => {
      const restaurantPhotosObj = {};

      //will populate obj where key is restaurant id and value is the resource name
      restaurantData.forEach((restaurant) => {
        restaurantPhotosObj[restaurant.id] = restaurant.photos[0].name;
      });

      try {
        //fetch photos for the restaurants using the ids of each place
        const result = await grabRestaurantPhotos(restaurantPhotosObj);

        if (result) {
          console.log('the object containing restaurants and photos:', result);
          setRestaurantPhotos(result);
        }
      } catch (err) {
        console.log('Error fetching photos:', err);
      }
    };

    fetchPhotos();
  }, [restaurantData]);

  let restaurantList;

  if (restaurantData) {
    console.log('TESTING DATA RETURNED FROM API:', restaurantData);

    //Here we are rendering all of the restaurant's information: name, price, address
    //creates the card component we want to see with restaurant details
    restaurantList = restaurantData.map((restaurant) => {
      //use the restaurant name and grab the image

      //temporary to save cost
      const photoUri = 'https://placehold.co/200';

      //DO NOT DELETE
      //UNCOMMENT BELOW WITH FUNCTION ABOVE TO GRAB ACTUAL PHOTO
      //fetch photo for restaurant using restaurant Id
      // const photoUri = restaurantPhotos[restaurant.id];

      //for each restaurant, grab the Name, Pricing, Rating, Address & Directions
      let price = '';
      if (restaurant.priceRange && restaurant.priceRange.endPrice) {
        //format the pricing for the restaurant
        price = `Average price between $${restaurant.priceRange.startPrice.units} and $${restaurant.priceRange.endPrice.units} per person.`;
      }

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

  /*
  SET UP THE FORM SUBMIT BUTTON TO ALLOW TO SUBMIT THE FORM WITH CHECKBOX LIST ITEMS

  THE LIST ITEMS WILL BE SUBMITTED AND ORGANIZED BY THE SERVER TO THEN FETCH RELATED RESTAURANTS

*/
  return (
    <div>
      <h3>Select the type of food you crave!</h3>
      <form onSubmit={props.grabRestaurantInfo}>
        <ul>
          {foodTypeFilter.map((type) => {
            return (
              <li key={type.id}>
                <Checkbox
                  id={type.id}
                  name={type.name}
                  checked={type.state}
                  checkHandler={checkHandler}
                />
              </li>
            );
          })}
        </ul>
        <button type='submit'>Find some Restaurants</button>
      </form>
      {/* <Checkbox id={foodType[1].id} name={foodType[1].name} /> */}

      {/*<button onClick={props.grabRestaurantInfo}>
        Refresh List of Restaurants
      </button>*/}
      <h3>Restaurant List</h3>
      <ul>{restaurantList}</ul>
    </div>
  );
};

export default DisplayRestaurants;
