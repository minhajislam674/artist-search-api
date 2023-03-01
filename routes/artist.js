const express = require("express");
const axios = require('axios');
const artistRoute =express.Router();

//define static folder
artistRoute.use(express.static('client'));


//route to get index.html which is the home page of the app
artistRoute.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
    }
);

//route to get artist based on search query
artistRoute.get('/artists', (req, res) => {
    const { artist } = req.query;
    const apiKey = 'f95134fdc22d7a26bd253cde350f6cad';
    const url = `https://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${artist}&api_key=${apiKey}&format=json`;
artist
    axios.get(url)
        .then(response => {
            console.log(response.data.results.artistmatches.artist);
            res.send(response.data.results.artistmatches.artist);
        })
        .catch(error => {
            console.log(error);
        });
});


module.exports = artistRoute



    