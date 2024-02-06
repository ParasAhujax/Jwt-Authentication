const express = require('express');
const { checkForLogin } = require('../controllers/userController');
const router = express.Router();

router.get('/',checkForLogin);

module.exports = router;