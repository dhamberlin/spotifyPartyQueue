const request = require('request-promise-native');


const Spotify = {};

let accessToken = 'BQA_xW-is1WMqabqZf15sXZrtxb3r4zXa-yT_lCBrIPdyiGOO9JRMaoGaxE7QKUbxBBk39E-MZW9Ae_VB6t2oQbDj28Qj-dFia3HmmCFNmUJtiQ1tcspcfMqAT2Ef8fyXhggYELcibrmAO90Rp-93nL9r9bE94QOaCRyfkrJoHplWYQjMz7oVS0zDHFjF2O3LhEdb39u0Ncnpx7DooqJFnPUsdpFYpu1e1DhA_rM0GZL2paK';
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
