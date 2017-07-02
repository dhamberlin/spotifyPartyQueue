const routes = require('express').Router();
const passport = require('passport');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const checkAuth = require('./auth').checkAuth;
const Spotify = require('./spotify');

routes.get('/', (req, res) => res.send('<a href="/auth">Connect with Spotify</a>'))

routes.get('/playlist', (req, res) => {
  Spotify.getPlaylist()
  .then(trackNames => res.send(`<pre>${JSON.stringify(trackNames)}</pre>`, null, 4));
})

///////////////////
// Receive texts //
///////////////////
routes.post('/sms', (req, res) => {
  Spotify.getTrack(req.body.Body)
  .then(track => {
    Spotify.play(track)
    .then(msg => {
      const response = new MessagingResponse();
      response.message(msg);
      res.writeHead(200, { 'Content-Type': 'text/xml' });
      res.end(response.toString());
    })
    .catch(err => {
      const response = new MessagingResponse();
      response.message(JSON.stringify(track));
      res.writeHead(200, { 'Content-Type': 'text/xml' });
      res.end(response.toString());
    })
  })
})

/////////////////
// Auth Routes //
/////////////////
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
