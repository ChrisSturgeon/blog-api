const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const app = require('../app');
const { body, validationResult, check } = require('express-validator');
const User = require('../models/user');
const bcrypt = require('bcryptjs');

// Passport
const passport = require('passport');
const e = require('express');

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
        if (err) {
          console.log(err);
        }
        if (data) {
          res.send('Success!');
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

  // console.log(req.body.user);

  // console.log(password);
  // console.log(username);

  // User.findOne({ username: user }).exec((err, found_user) => {
  //   if (err) {
  //     res.send(err);
  //   }

  //   if (found_user) {
  //     res.json(found_user);
  //   } else {
  //     res.send('No user found!');
  //   }
  // });

  // Check if user exists in database

  // User.findOne({ username: username }).exec((err, found_user) => {
  //   if (err) {
  //     return next(err);
  //   } else {
  //     if (found_user.password === password) {
  //       const options = {
  //         expiresIn: '30s',
  //       };
  //       const secret = 'SECRET_KEY';
  //       const token = jwt.sign({ email }, secret, options);
  //       return res.status(200).json({
  //         message: 'Auth Passed',
  //         token,
  //       });
  //     } else {
  //       return next(err);
  //     }
  //   }
  // });

  // if (email === 'sturgeon.chris@gmail.com') {
  //   if (password === 'hello') {
  //   } else {
  //     return res
  //       .status(401)
  //       .json({ message: 'Auth Failed - Invalid Password' });
  //   }
  // } else {
  //   return res
  //     .status(401)
  //     .json({ message: 'Auth Failed - User does not exist' });
  // }
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
