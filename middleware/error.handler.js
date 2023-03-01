const errorHandlerMiddleware = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong, please try again later.');
  };

module.exports = errorHandlerMiddleware;
