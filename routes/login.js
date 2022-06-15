const express = require('express');
const router = express.Router();
const loginController = require('../controllers/login');
const db = require('../models/');
const validationList = require('../validation/validationList');

//** ルーティングを更にまとめる /login  /signup など */

router.get('/',loginController.showLogin);

router.post('/',validationList.login,loginController.doLogin);

module.exports = router;
