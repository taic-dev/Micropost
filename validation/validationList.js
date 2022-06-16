const { check } = require('express-validator');
const loginController = require('../controllers/login');

const validationList = {
    login: [
        check('mail','メールアドレスを記入してください').isEmail().escape(),
        check('password','パスワードを記入してください').notEmpty().escape()
    ],
    signup: [
        check('username','ユーザー名記入してください').notEmpty().escape(),
        check('mail','メールアドレスを記入してください').isEmail().escape(),
        check('password').custom((value, {req})=>{
            if(req.body.password == "" || req.body.password_confirmation == ""){throw new Error('パスワードを記入してください');}
            if(req.body.password !== req.body.password_confirmation){throw new Error('パスワードが一致していません');}
            return true;
        })
    ],
}

module.exports = validationList;