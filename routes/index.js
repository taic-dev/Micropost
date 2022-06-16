const express = require('express');
const router = express.Router();

const indexController = require('../controllers/index');
const loginController = require('../controllers/login');
const signupController = require('../controllers/signup')
const db = require('../models/');
const validationList = require('../validation/validationList');

/************************
 * index routing
************************/

router.get('/',indexController.showIndex);

/************************
 * Login routing
************************/

router.get('/login',loginController.showLogin);

router.post('/login',validationList.login,loginController.doLogin);

/************************
 * Signup routing
************************/

router.get('/signup', signupController.showSignup);

router.post('/signup',validationList.signup,signupController.doSignup);


module.exports = router;
