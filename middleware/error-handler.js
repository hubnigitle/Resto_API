const CLientError = require('../errors/ClientError');

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  // console.log(err);
  if (err instanceof CLientError) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }
  return res.status(500).json({
    message: 'Internal Server Error',
  });
};

module.exports = errorHandler;
