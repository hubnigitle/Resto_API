const express = require('express');

// eslint-disable-next-line object-curly-newline
const { getAllMenu, getMenuById, addMenu, updateMenu, deleteMenu } = require('../controllers');
const menuValidation = require('../middleware/validation/menu-validation');
const authorization = require('../middleware/auth');

const router = express.Router();

router.get('/allMenu', authorization, getAllMenu);
router.get('/menu/:id', getMenuById);
router.post('/menu', menuValidation, addMenu);
router.put('/menu/:id', updateMenu);
router.delete('/menu/:id', deleteMenu);

module.exports = router;
