const express = require('express');
const morgan = require('morgan');
const path = require('path');

const artistRoute = require('./routes/artists.router');

const app = express();
const PORT = 8080;

app.use(morgan('dev'));
app.use('/', express.static(path.join(__dirname, 'views')));

app.use('/artists', artistRoute);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Error');

  });

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}...`);
  });