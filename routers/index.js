const express = require('express');

const menuRoutes = require('./menu.routes');
const userRoutes = require('./user.routes');
const authRoutes = require('./auth.routes');

const router = express.Router();

router.use('', menuRoutes);
router.use('', userRoutes);
router.use('', authRoutes);

module.exports = router;
