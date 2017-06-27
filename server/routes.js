const routes = require('express').Router();
const passport = require('passport');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const checkAuth = require('./auth').checkAuth;
const Spotify = require('./spotify');

routes.get('/auth', passport.authenticate('spotify',
  { scope: ['playlist-modify-public', 'playlist-modify-private', 'user-read-playback-state', 'user-modify-playback-state'] }));

routes.get('/auth/callback',
  passport.authenticate('spotify', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/loggedIn');
  });

routes.get('/auth/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

routes.get('/loggedIn', checkAuth, (req, res) => {
  res.send(`<p>Logged in! User info:</p>
    <a href="/auth/logout">Log out</a>
    <pre>${JSON.stringify(req.user, null, 4)}</pre>`);
});

routes.post('/sms', (req, res) => {
  console.log(req.body)
  Spotify.getTrack(req.body.Body)
  .then(uri => {
    Spotify.play(uri);
    const response = new MessagingResponse();
    response.message(JSON.stringify(uri));
    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end(response.toString());
  })
})

// To send message  unbidden:
// client.messages.create({
//   to: '+18022752573',
//   from: '+18022272300',
//   body: 'MESSAGE TEXT',
// }, (err, message) => {
//   message && console.log('msg: ', message)
//   err && console.log('err: ', err)
// );

module.exports = routes;
