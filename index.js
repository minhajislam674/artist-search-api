const express = require('express'), 
    morgan = require('morgan');

const artistRoute = require('./routes/artist');
const app = express();

// Morgan logging middleware
app.use(morgan('dev'));

//define static folder
app.use(express.static('client'));

//route to get index.html which is the home page of the app
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
    }
);

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