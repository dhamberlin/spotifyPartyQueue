const request = require('request-promise-native');


const Spotify = {};

let accessToken = '';
let playlistID = '6U91AbgdRpMWSOAtuZeqm7';
let userID = '';

Spotify.setAccessToken = (token) => {
  accessToken = token;
}

Spotify.setUserID = (ID) => {
  userID = ID;
  console.log('userID: ', userID)
}

Spotify.setPlaylist = (ID) => {
  playlistID = playlistID;
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


Spotify.addToPlaylist = (track) =>
  new Promise ((resolve, reject) => {
    const url = `https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`;
    const options = {
      headers: { Authorization: `Bearer ${accessToken}` },
      body: JSON.stringify({ uris: [track.uri] }),
    }
    request.post(url, options)
    .then(res => resolve(res))
    .catch(err => resolve(err))
  })


Spotify.getPlaylist = () =>
  new Promise ((resolve, reject) => {
    const url = `https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`;
    const options = { headers: { Authorization: `Bearer ${accessToken}` } };
    options.body = JSON.stringify(options.body);
    request(url, options)
    .then(data => JSON.parse(data))
    .then(data => data.items.map(t => t.track.name))
    .then(trackNames => resolve(trackNames))
    .catch(err => reject(err))
  })

module.exports = Spotify;
