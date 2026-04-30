const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('../models/User');

router.get('/register', (req, res) => res.render('register'));

router.post('/register', async (req, res) => {
  const { username, password, age, phoneNumber } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  await User.create({
    username,
    password: hashed,
    age,
    phoneNumber,
    coursesEnrolled: []
  });

  res.redirect('/login');
});

router.get('/login', (req, res) => res.render('login'));

router.post('/login',
  passport.authenticate('local', {
    successRedirect: '/scholarship',
    failureRedirect: '/login'
  })
);

router.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/login');
  });
});

module.exports = router;
