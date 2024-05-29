const menuControllers = require('./menu.controller');
const userControllers = require('./user.controller');
const authControllers = require('./auth.controller');

module.exports = {
  ...menuControllers,
  ...userControllers,
  ...authControllers,
};
