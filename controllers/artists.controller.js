const artistsModel = require('../models/artists.model')
const json2csv = require('json2csv').parse;

async function getArtists (req, res) {
    const {artistName} = req.query;

    try {
        let artists = await artistsModel.getArtists(artistName);
        if (!artists.length) {
            artists = await artistsModel.getRandomArtists();
          }
        res.status(200).send(artists);
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
}

async function getArtistsCSV (req, res) {
    const {artistName, fileName} = req.params;

    try {
        let artists = await artistsModel.getArtists(artistName);
        if (!artists.length) {
            artists = await artistsModel.getRandomArtists();
          }
        const artistsCSV = artistsModel.modifyDataForCSV(artists);
        const csv = json2csv(artistsCSV);
        res.attachment(`${fileName}.csv`);
        res.status(200).send(csv);
    }
    catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
}
        
module.exports = {
    getArtists,
    getArtistsCSV
};