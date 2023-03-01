const express = require('express'), 
    morgan = require('morgan');
    // json2csv = require('json2csv').parse;

const artistRoute = require('./routes/artist');

const app = express();

// Morgan middleware
app.use(morgan('dev'));

// Routes
app.use('/', artistRoute);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Error');
  });

// Listening to port
const port = process.env.PORT || 8080
const start = async () => {
    try {
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.log(error);
    }
}
start();