const request = require('request-promise-native');


const Spotify = {};

let accessToken = '';
Spotify.setAccessToken = (token) => {
  accessToken = token;
}

Spotify.getTrack = (query) =>
  new Promise((resolve, reject) => {
    const url = `https://api.spotify.com/v1/search?q=${query}&type=track&market=US&limit=1`
    const options = {
      headers: { Authorization: `Bearer ${accessToken}` }
    }
    request(url, options)
    .then(response => JSON.parse(response))
    .then(response => {
      // console.log(JSON.stringify(response, null, 4))
      resolve(response.tracks.items[0]);
    })
    .catch(err => console.log(err));
  })


Spotify.play = (track) =>
  new Promise((resolve, reject) => {
    console.log(track.artists)
    const url = 'https://api.spotify.com/v1/me/player/play';
    const options = {
      headers: { Authorization: `Bearer ${accessToken}` },
      body: { uris: [track.uri] }
    }
    options.body = JSON.stringify(options.body);
    request.put(url, options)
    .then(res => resolve(`Playing '${track.name}' by ${track.artists.map(a => a.name).join(', ')}`))
    .catch(err => reject(err))
  })


Spotify.addToQueue = (uri) => {

};

module.exports = Spotify;
