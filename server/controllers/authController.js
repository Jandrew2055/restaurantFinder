const authController = {};

authController.signup = (req, res, next) => {
  const { email, password } = req.body;
  // console.log('req:', req);
  console.log('email:', email);
  console.log('password:', password);

  return next();
};

authController.login = (req, res, next) => {
  return next();
};

module.exports = authController;
