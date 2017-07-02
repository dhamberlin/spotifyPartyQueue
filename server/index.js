const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const express = require('express');
const session = require('express-session');
const passport = require('passport');

const seshSecret = process.env.seshSecret ? process.env.seshSecret : require('../config').seshSecret;
const routes = require('./routes');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, '../public')));
app.use(session({
  secret: seshSecret,
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(routes);

const port = process.env.PORT || 8080
app.listen(port, () => console.log('listening on port ', port));
