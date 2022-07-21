const express = require('express');
const app = express();
const router = express.Router();

/************************
 * Controllers
************************/
const indexController = require('../controllers/index');
const loginController = require('../controllers/login');
const applicationController = require('../controllers/application');
const resetController = require('../controllers/reset');
const signupController = require('../controllers/signup');
const logoutController = require('../controllers/logout');
const sessionController = require('../controllers/session');
const topController = require('../controllers/top');
const profileController = require('../controllers/profile');
const editController = require('../controllers/edit');
const validationList = require('../controllers/validationList');
const errorController = require('../controllers/error');

/************************
 * Models
************************/
const db = require('../models/');

/************************
 * Image upload
************************/
const multer = require('multer');
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
 * Application routing
************************/

router.get('/application',applicationController.showApplication);

router.post(
    '/application',
    validationList.application,
    applicationController.judgeApplication,
    applicationController.doApplication
);

/************************
 * Reset routing
************************/
router.get('/reset/:token',resetController.showReset);

router.post(
    '/reset/:token',
    validationList.reset,
    resetController.judgeReset,
    resetController.doReset
);

/************************
 * Signup routing
************************/

router.get('/signup', signupController.showSignup);

router.post(
    '/signup',
    upload.single('file'), 
    validationList.signup,
    signupController.judgeSignup,
    signupController.doSignup
);

/************************
 * Top routing
************************/

router.get('/top',sessionController.judgeSession,topController.showTop);

router.post('/top',topController.addPost);

/************************
 * Delete Post routing
************************/

router.post('/delete-post',topController.deletePost);

/************************
 * Logout routing
************************/

router.get('/logout',sessionController.judgeSession,logoutController.doLogout);

/************************
 * Profile routing
************************/

router.get('/profile',sessionController.judgeSession,profileController.showProfile);

router.get(
    '/profile/:userName',
    sessionController.judgeSession,
    errorController.issetUser,
    profileController.showProfile
);

/************************
 * Edit routing
************************/

router.get('/edit',sessionController.judgeSession,editController.showEditPage);

router.post(
    '/edit',
    upload.single('file'), 
    validationList.signup, 
    editController.judgeProfile,
    editController.changeProfile
);

/************************
 * Delete  routing
************************/

router.get('/delete-account/:userName',sessionController.judgeSession,editController.deleteAccount);

module.exports = router;
