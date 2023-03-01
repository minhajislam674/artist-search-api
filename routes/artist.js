const express = require("express");
const axios = require('axios');
const artistRoute =express.Router();
const json2csv = require('json2csv').parse;

//define static folder
artistRoute.use(express.static('client'));

//route to get index.html which is the home page of the app
artistRoute.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
    }
);

// route to get artist based on search query
artistRoute.get('/artists', async (req, res) => {
  const {artistName} = req.query;
  const apiKey = 'f95134fdc22d7a26bd253cde350f6cad';
  const url = `https://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${artistName}&api_key=${apiKey}&format=json`;

  await axios.get(url)
    .then(response => {
      const artists = response.data.results.artistmatches.artist;
      res.send(artists)
      console.log(artists)
    })
    .catch(error => {
      console.log(error);
      res.status(500).send(error.message);
    });
})

//Route to get artist CSV file based on user-defined name
artistRoute.get('/artists/:artistName/csv/:fileName', (req, res) => {
  const {artistName, fileName} = req.params;
  const apiKey = 'f95134fdc22d7a26bd253cde350f6cad';
  const url = `https://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${artistName}&api_key=${apiKey}&format=json`;

  axios.get(url)
      .then(response => {
          const artists = response.data.results.artistmatches.artist;
          const modifiedArtists = artists.map(artist => {
              return {
              'artist_name': artist.name,
              'mbid': artist.mbid,
              'url': artist.url,
              'image_small': artist.image[0]['#text'],
              'image': artist.image[3]['#text']
              }
          });
          const csv = json2csv(modifiedArtists);
          res.attachment(`${fileName}.csv`);
          res.status(200).send(csv);
      })

      .catch(error => {
          console.log(error);
          res.status(500).send(error.message);
      });
  })

module.exports = artistRoute;