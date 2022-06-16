const express = require('express');
const router = express.Router();

const indexController = require('../controllers/index');
const loginController = require('../controllers/login');
const signupController = require('../controllers/signup');
const logoutController = require('../controllers/logout');
const topController = require('../controllers/top');
const profileController = require('../controllers/profile');
const editController = require('../controllers/edit');

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
 * Delete routing
************************/

router.post('/delete',topController.deletePost);

/************************
 * Logout routing
************************/

router.get('/logout',logoutController.doLogout);

/************************
 * Profile routing
************************/

router.get('/profile',profileController.showProfile);

/************************
 * Edit routing
************************/

router.get('/edit',editController.showEdit);

module.exports = router;
