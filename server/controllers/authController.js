require('dotenv').config();
const supabase = require('../models/supabaseClient');

const authController = {};

authController.signup = async (req, res, next) => {
  const { email, password } = req.body;
  console.log('email:', email); //DELETE
  console.log('password:', password); //DELETE

  //procedure below for signing up user (sends confirmation email to user)
  try {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    if (error) {
      console.log('error signing up user Supabase:', error);
      return next(error);
    }
    res.locals.user = data.user;
    return next();
    //TESTING COULD BE DELETED
    // console.log('testing data received:', data);
    // console.log('error received:', error);
  } catch (err) {
    console.log('error encountered signing up user:', err);
    return next(err);
  }
};

authController.login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      console.log('error signing in with Supabase:', error);
      return next(error);
    }
    console.log('testing data received:', data);
    return next();
  } catch (err) {
    console.log('error encountered signing in:', err);
    return next(err);
  }

  //handle the logic using supabase here
  // console.log('email:', email);
  // console.log('password:', password);
};

module.exports = authController;
