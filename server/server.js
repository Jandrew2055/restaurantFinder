const path = require('path');
const express = require('express');

const app = express();
const PORT = process.env.NODE_env === 'development' ? 8080 : 3000;

//To be used for supporting extended features during development procedure
// if (process.env.NODE_env === 'development') {
// }

app.use(express.json());
