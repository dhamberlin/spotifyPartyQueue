const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;
const Spotify = require('./spotify');
const config = require('../config')


// const config = process.env.SPOTIFYID ? {
//   clientID: process.env.SPOTIFYID,
//   clientSecret: process.env.SPOTIFYSECRET,
// } : require('../config');

const baseURL = process.env.BASEURL || 'http://localhost:8080';
console.log('baseURL: ', baseURL)

passport.use(new SpotifyStrategy({
  clientID: config.spotifyID,
  clientSecret: config.spotifySecret,
  callbackURL: `${baseURL}/auth/callback`,
},
  (accessToken, refreshToken, profile, done) => {
    Spotify.setAccessToken(accessToken);
    Spotify.setUserID(profile.id);
    console.log('id: ', profile.id);
    profile.accessToken = accessToken;
    // profile.refreshToken = refreshToken;
    done(null, profile)
  }));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

exports.checkAuth = (req, res, next) => {
  if (!req.isAuthenticated()) res.redirect('/');
  else return next();
};

exports.accessToken = '';
