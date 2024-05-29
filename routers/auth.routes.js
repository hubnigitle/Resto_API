const express = require('express');

// // eslint-disable-next-line object-curly-newline
const { login, logout } = require('../controllers');

const router = express.Router();

router.post('/login', login);
router.post('/logout', logout);

module.exports = router;
