const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv'); //access environment variables
dotenv.config(); //and invoke dotenv.config() to read .env file

const NODE_ENV = process.env.NODE_ENV;
const MONGO_URI = process.env.MONGO_URI; //grabs the mongo uri from the .env file
const PORT = process.env.PORT || 8080; //To be used for supporting extended features during development procedure

console.log('testing env variable:', NODE_ENV);
const app = express();
const favoritesRouter = require('./routes/favoritesRouter');
const restaurantRouter = require('./routes/restaurantRouter');
const authRouter = require('./routes/authRouter');

//parses through any incoming request if they contain a payload(in json format)
app.use(express.json());

// app.use(express.static(path.join(__dirname, 'build')));
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log('Error connecting to MongoDB: ', err);
  });

app.use('/favorites', favoritesRouter); //used for favoritePage
app.use('/api/auth', authRouter);
app.use('/api', restaurantRouter); //used for all api calls

//dynamically handle production or development
if (NODE_ENV === 'production') {
  // Serve static files from React build folder (located in the root directory)
  app.use(express.static(path.join(__dirname, '..', 'build'))); // Going up one level from the server directory

  // Serve index.html for all other routes (client-side routing)
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'build', 'index.html')); // Same here, adjust to the root directory
  });
} else {
  app.get('/', (req, res) => {
    res.send('Development mode');
  });
}

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
  console.log(
    `${
      NODE_ENV === 'production' ? 'Production' : 'Development'
    } server running on port ${PORT}`
  );
});

module.exports = app;
