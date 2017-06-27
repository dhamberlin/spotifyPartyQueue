const request = require('request-promise-native');


const Spotify = {};

let accessToken = 'BQAAKbqchs0d8s4ZCYPL0unL0f_qJDoCnKDiVX40c4zKnq1VzMMs0cxLnCH-ND0NXwEO282ihIY3EOfzjxoSsAuOxEZhv_ED6lh7v9clxjGF1FiU5zFhBt0K6UC40PcUQrie2IrD8qCF21LkqK6yXiKM0xDd5jfblvOlVWwbsihFZxeArzA4sQRvVOZl1g_3Q15J6BD0Db5N32e4XCWr3TGGPwZVRZvsFU0tw5NBHsfjWxJU';
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
      resolve(response.tracks.items[0].uri);
    })
    .catch(err => console.log(err));
  })


Spotify.play = (uri) => {
  const url = 'https://api.spotify.com/v1/me/player/play';
  const options = {
    headers: { Authorization: `Bearer ${accessToken}` },
    body: { uris: [uri] }
  }
  options.body = JSON.stringify(options.body);
  request.put(url, options)
  .then(res => console.log(res))
  .catch(err => console.log(err))
};

Spotify.addToQueue = (uri) => {

};

module.exports = Spotify;
