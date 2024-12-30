const express = require('express');
const router = express.Router();
const { createuser, loginuser } = require('../controllers/usercontroller');
const{ authenticate} = require('../middleware/auth');

// Route for user signup
router.route('/signup').post(createuser);

// Route for user login
router.route('/login').post(loginuser);

// Route for getting current user details (protected) TESTING PURPOSE
router.route('/current').get(authenticate, (req, res) => {
  res.json({ message: "Current user details", user: req.user });
});

module.exports = router;
