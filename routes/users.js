var express = require('express');
var router = express.Router();
const user_controller = require('../controllers/users_controller');
const user = require('../models/user');

router.get('/', function (req, res, next) {
  res.send('This is the users route');
});

router.get('/login', user_controller.login_get);

router.post('/login', user_controller.login_post);

router.post('/register', user_controller.user_create_post);

module.exports = router;
