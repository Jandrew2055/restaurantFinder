const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv'); //access environment variables
dotenv.config(); //and invoke dotenv.config() to read .env file
const MONGO_URI = process.env.MONGO_URI; //grabs the mongo uri from the .env file

const app = express();
const favoritesRouter = require('./routes/favoritesRouter');
const restaurantRouter = require('./routes/restaurantRouter');
// const PORT = process.env.NODE_env === 'development' ? 8080 : 3000;

const PORT = 8080;
//To be used for supporting extended features during development procedure
// if (process.env.NODE_env === 'development') {
// }

//parses through any incoming request if they contain a payload(in json format)
app.use(express.json());

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log('Error connecting to MongoDB: ', err);
  });

//make routes for app to make a request to that would route to the specific api
app.use('/favoriteForum', favoritesRouter);

//if requests are made to api, route them here
app.use('/api', restaurantRouter);

//simple get request to the page return 200 status code
app.get('/', (req, res) => {
  return res.sendStatus(200);
});

//take care of unknown routes, always to be presented right before global error handler
app.use((req, res) => res.sendStatus(404));

//global error handler
app.use((err, req, res, next) => {
  //default error to use, template
  const defaultError = {
    log: 'caught unknown middleware error',
    status: 500,
    message: { err: 'An error has occurred, check the code.' },
  };

  //if actual error contains any other components it will replace current default template
  const errorObj = Object.assign(defaultError, err);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;
