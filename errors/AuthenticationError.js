const CLientError = require('./ClientError');

class AuthenticationError extends CLientError {
  constructor(message) {
    super(message, 401);

    this.name = 'AuthenticationError';
  }
}

module.exports = AuthenticationError;
