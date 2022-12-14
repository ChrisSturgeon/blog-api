const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Login on GET
exports.login_get = (req, res) => {
  res.send('This is the GET login via controller');
};

// Login on POST
exports.login_post = async (req, res) => {
  // Destructure username and pasword from request body
  const { user, password } = req.body;

  try {
    const found_user = await User.findOne({ username: user });
    // User present so compare passwords
    if (found_user) {
      bcrypt.compare(password, found_user.password, function (err, data) {
        // Handle any error
        if (err) {
          return next(err);
        }
        // Passwords match so issue JWT
        if (data) {
          const options = {
            expiresIn: '1h',
          };
          const secret = process.env.JWT_SECRET;
          const token = jwt.sign({ sub: found_user._id }, secret, options);
          return res.status(200).json({
            message: 'Auth Passed',
            token,
          });
          // Passwords do not match so send error
        } else {
          res.status(403).send('Incorrect password');
        }
      });
    } else {
      res.status(404).send('No user found');
    }
  } catch (err) {
    return next(err);
  }
};

// Register user on POST
exports.user_create_post = [
  // Sanitise inputs
  body('username', 'Username required').trim().isLength({ min: 1 }).escape(),
  body('password', 'Password required').trim().isLength({ min: 1 }).escape(),
  body('secret').trim().escape(),

  // Process the request checking user knows secret password
  (req, res, next) => {
    if (req.body.secret !== process.env.REGISTER_KEY) {
      res.status(403).send('Access Denied');
      return;
    } else {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        res.send(errors.array());
      } else {
        bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
          if (err) {
            return next(err);
          }
          // Create new user object and save in database
          const user = new User({
            username: req.body.username,
            password: hashedPassword,
            joined: new Date(),
            posts: [],
          }).save((err) => {
            if (err) {
              return next(err);
            }
            res.status(200).send('User successfully created in database');
          });
        });
      }
    }
  },
];
