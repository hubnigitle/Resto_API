const express = require('express');

// eslint-disable-next-line object-curly-newline
const { getAllUser, register } = require('../controllers');

const router = express.Router();

router.get('/users', getAllUser);
router.post('/user', register);

module.exports = router;
