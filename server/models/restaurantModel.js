const mongoose = require('mongoose'); //import mongoose so we can use it
const { Schema } = mongoose; //so we can call Schema without mongoose.Schema

const restaurantSchema = new Schema({
  name: String,
  restaurantName: String,
});

const Restaurants = mongoose.model(
  'Restaurants',
  restaurantSchema,
  'favoriteRestaurants'
);

module.exports = Restaurants;
