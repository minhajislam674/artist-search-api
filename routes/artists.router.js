const express = require("express");
const { getArtists, getArtistsCSV } = require("../controllers/artists.controller");

const artistRoute = express.Router();

// route to get artist based on search query
artistRoute.get('/', getArtists );

//Route to get artist CSV file based on user-defined name
artistRoute.get('/:artistName/csv/:fileName', getArtistsCSV  );

module.exports = artistRoute;