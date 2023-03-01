const express = require("express");
const axios = require('axios');
const json2csv = require('json2csv').parse;
const artistRoute = express.Router();

// route to get artist based on search query
artistRoute.get('/artists', async (req, res) => {
  const {artistName} = req.query;
  const apiKey = 'f95134fdc22d7a26bd253cde350f6cad';
  const url = `https://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${artistName}&api_key=${apiKey}&format=json`;

  let artists = [];

  try {
    const response = await axios.get(url);
    artists = response.data.results.artistmatches.artist;

    if(artists.length === 0) {
      // If there are no results, retrieve random artist names from mock artist data
      const artistMockNames = ['Elvis', 'Scorpions', 'Kodaline'];
      const randomArtistName = artistMockNames[Math.floor(Math.random() * artistMockNames.length)];
      const url = `https://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${randomArtistName}&api_key=${apiKey}&format=json`;
      const response = await axios.get(url);
      artists = response.data.results.artistmatches.artist;
      console.log(`No results found for your search query ${artistName}. Using ${randomArtistName} as search query instead.`);
    }
    res.status(200).send(artists);
    
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});


//Route to get artist CSV file based on user-defined name
artistRoute.get('/artists/:artistName/csv/:fileName', async (req, res) => {
  const {artistName, fileName} = req.params;
  const apiKey = 'f95134fdc22d7a26bd253cde350f6cad';
  const url = `https://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${artistName}&api_key=${apiKey}&format=json`;

  let artists = [];

  try {
    const response = await axios.get(url);
    artists = response.data.results.artistmatches.artist;

  
      if(artists.length === 0) {
        // If there are no results, retrieve random artist names from mock artist data
        const artistMockNames = ['Elvis', 'Scorpions', 'Kodaline'];
        const randomArtistName = artistMockNames[Math.floor(Math.random() * artistMockNames.length)];
        const url = `https://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${randomArtistName}&api_key=${apiKey}&format=json`;
        const response = await axios.get(url);
        artists = response.data.results.artistmatches.artist;
        console.log(`No results found for your search query ${artistName}. Using ${randomArtistName} as search query instead.`);
      }

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
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

module.exports = artistRoute;