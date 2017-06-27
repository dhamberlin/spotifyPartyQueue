const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const express = require('express');
const session = require('express-session');
const passport = require('passport');

const config = require('../config');
const routes = require('./routes');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, '../public')));
app.use(session({
  secret: config.seshSecret,
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(routes);


app.listen(8080, () => console.log('listening on port 8080'));
