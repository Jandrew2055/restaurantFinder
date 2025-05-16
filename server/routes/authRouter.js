const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

//handles users logging in
router.post('login', authController.login, (req, res) => {
  return res.status(200);
});

//handles users signing up
router.post('/signup', authController.signup, (req, res) => {
  return res.status(200).json('FORM SUBMITTED AND USER SIGNED UP');
});

module.exports = router;
