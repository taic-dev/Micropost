const { check } = require('express-validator');
const loginController = require('../controllers/login');

const validationList = {
    login: [
        check('mail','メールアドレスを記入してください').isEmail().escape(),
        check('password','パスワードを記入してください').notEmpty().escape()
    ],
}

module.exports = validationList;