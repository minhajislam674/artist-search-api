const axios = require('axios');
const apiKey = 'f95134fdc22d7a26bd253cde350f6cad';

async function getArtists(artistName) {
  const url = `https://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${artistName}&api_key=${apiKey}&format=json`;
  const response = await axios.get(url);
  return response.data.results.artistmatches.artist;
}

async function getRandomArtists() {
  const artistMockNames = ['Elvis', 'Scorpions', 'Kodaline', 'Rammstein'];
  const randomArtistName = artistMockNames[Math.floor(Math.random() * artistMockNames.length)];
  const artists = await getArtists(randomArtistName);
  console.log(`Using ${randomArtistName} as search query.`);
  return artists;
}

function modifyDataForCSV(artists) {
  return artists.map(artist => ({
    artist_name: artist.name,
    mbid: artist.mbid,
    url: artist.url,
    image_small: artist.image[0]['#text'],
    image: artist.image[3]['#text'],
  }));
}

module.exports = {
    getArtists,
    getRandomArtists,
    modifyDataForCSV,
};