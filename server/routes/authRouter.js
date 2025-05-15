const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

app.post('login', authController.login, (req, res) => {
    return res.status(200);
});

app.post('/signup', authController.signup, (req, res) => {
    return res.status(200);
});

module.exports = router;
