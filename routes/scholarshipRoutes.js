const express = require('express');
const router = express.Router();
const Scholarship = require('../models/Scholarship');

function isAuth(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/login');
}

// INDEX
router.get('/scholarship', isAuth, async (req, res) => {
  const data = await Scholarship.find();
  res.render('index', { data, user: req.user });
});

// NEW
router.get('/scholarship/new', isAuth, (req, res) => {
  res.render('new');
});

// CREATE
router.post('/scholarship', isAuth, async (req, res) => {
  await Scholarship.create(req.body);
  res.redirect('/scholarship');
});

// SHOW
router.get('/scholarship/:id', isAuth, async (req, res) => {
  const data = await Scholarship.findById(req.params.id);
  res.render('show', { data });
});

// EDIT
router.get('/scholarship/:id/edit', isAuth, async (req, res) => {
  const data = await Scholarship.findById(req.params.id);
  res.render('edit', { data });
});

// UPDATE
router.post('/scholarship/:id', isAuth, async (req, res) => {
  const { percentage } = req.body;

  await Scholarship.findByIdAndUpdate(req.params.id, {
    percentage
  });

  res.redirect('/scholarship');
});

module.exports = router;
