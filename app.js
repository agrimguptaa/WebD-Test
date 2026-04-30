const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');

const app = express();

// DB
mongoose.connect('mongodb://127.0.0.1:27017/test3');

// Middleware
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

// Routes
app.use(require('./routes/authRoutes'));
app.use(require('./routes/scholarshipRoutes'));

// Server
app.listen(8080, () => console.log("Server running"));
