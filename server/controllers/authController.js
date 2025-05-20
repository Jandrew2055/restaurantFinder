require('dotenv').config();
const supabase = require('../models/supabaseClient');

const authController = {};

authController.signup = async (req, res, next) => {
  const { email, password } = req.body;

  //REVAMP TO TRY CATCH FORM
  //handle the logic using supabase here
  console.log('email:', email);
  console.log('password:', password);

  const signupNewUser = async () => {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    console.log('testing data received:', data);
    console.log('error received:', error);
  };
  signupNewUser();

  //in following middleware let client know there was a successful signup
  return next();
};

authController.login = (req, res, next) => {
  const { email, password } = req.body;

  //handle the logic using supabase here
  console.log('email:', email);
  console.log('password:', password);

  return next();
};

module.exports = authController;
