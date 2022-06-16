const express = require('express');
const router = express.Router();

const indexController = require('../controllers/index');
const loginController = require('../controllers/login');
const signupController = require('../controllers/signup');
const logoutController = require('../controllers/logout');
const topController = require('../controllers/top');

const db = require('../models/');
const validationList = require('../validation/validationList');

/************************
 * Index routing
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

/************************
 * Top routing
************************/

router.get('/top', topController.showTop);

router.post('/top',topController.addPost);

/************************
 * Logout routing
************************/

router.get('/logout',logoutController.doLogout);



module.exports = router;
