const authController = {};

authController.signup = (req, res, next) => {
  const { email, password } = req.body;

  //handle the logic using supabase here
  console.log('email:', email);
  console.log('password:', password);

  //in following middleware let client know there was a successful signup
  return next();
};

authController.login = (req, res, next) => {
  return next();
};

module.exports = authController;
