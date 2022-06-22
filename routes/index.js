const express = require('express');
const router = express.Router();

const indexController = require('../controllers/index');
const loginController = require('../controllers/login');
const signupController = require('../controllers/signup');
const logoutController = require('../controllers/logout');
const topController = require('../controllers/top');
const profileController = require('../controllers/profile');
const editController = require('../controllers/edit');

/************************
 * Models
************************/
const db = require('../models/');
const validationList = require('../controllers/validationList');
const errorController = require('../controllers/error');

/************************
 * Image upload
************************/
const multer = require('multer');
// const { doSignup } = require('../controllers/signup');
// const { changeProfile } = require('../controllers/edit');
const storage = multer.diskStorage({
    destination: (req,file,cd)=>{
        cd(null,'public/uploads/');
    },
    filename: (req,file,cd)=>{
        cd(null,file.originalname);
    }
});
const upload = multer({storage: storage});

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

router.post(
    '/signup',
    upload.single('file'), 
    validationList.signup,
    signupController.doSignup
);

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

router.get('/profile/:userName',errorController.issetUser,profileController.showProfile);

/************************
 * Edit routing
************************/

router.get('/edit',editController.showEditPage);

router.post(
    '/edit',
    upload.single('file'), 
    validationList.signup, 
    editController.judgeProfile,
    editController.changeProfile
);

module.exports = router;
