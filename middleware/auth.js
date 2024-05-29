// eslint-disable-next-line import/no-extraneous-dependencies
const jwt = require('jsonwebtoken');
const AuthorizationError = require('../errors/AuthorizationError');

const authorization = (req, res, next) => {
  try {
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer')) {
      throw new AuthorizationError('Invalid Token');
    }

    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, process.env.SECRET_KEY, (error, decode) => {
      if (error) {
        throw new AuthorizationError('Invalid Token');
      }

      req.User = decode;
    });

    return next();
  } catch (error) {
    return next(error);
  }
};

module.exports = authorization;
