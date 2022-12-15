const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const app = require('../app');
const { body, validationResult, check } = require('express-validator');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Passport
const passport = require('passport');

// Login on GET
exports.login_get = (req, res) => {
  res.send('This is the GET login via controller');
};

// Login on POST
exports.login_post = async (req, res) => {
  // Destructure username from request body
  const { user, password } = req.body;

  try {
    const found_user = await User.findOne({ username: user });
    // User present so compare passwords
    if (found_user) {
      bcrypt.compare(password, found_user.password, function (err, data) {
        // Handle any error
        if (err) {
          console.log(err);
        }
        // Passwords match so issue JWT
        if (data) {
          const options = {
            expiresIn: '1m',
          };
          const secret = process.env.JWT_SECRET;
          const token = jwt.sign({ sub: found_user._id }, secret, options);
          return res.status(200).json({
            message: 'Auth Passed',
            token,
          });
          // Passwords do not match so send error
        } else {
          res.send('Incorrect password');
        }
      });
    } else {
      res.send('No user found');
    }
  } catch (err) {
    res.send(err);
  }
};

exports.protected = [
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    return res.status(200).send('Yay! This is a protected route');
  },
];

// Register on POST

exports.user_create_post = [
  // Sanitise inputs
  body('username', 'Username required').trim().isLength({ min: 1 }).escape(),
  body('password', 'Password required').trim().isLength({ min: 1 }).escape(),

  // Process the request
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.send(errors.array());
    } else {
      bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
        if (err) {
          return next(err);
        }

        const user = new User({
          username: req.body.username,
          password: hashedPassword,
          joined: new Date(),
          posts: [],
        }).save((err) => {
          if (err) {
            return next(err);
          }
          res.send('User successfully created in database');
        });
      });
    }
  },
];
