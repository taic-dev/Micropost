const express = require('express');
const router = express.Router();
const app = require('../app');
const connection = require('../db/connection');
const query = require('../db/query');
const { check, validationResult } = require('express-validator');

router.get('/',(req,res,next)=>{
    res.render('signup',{
        isAuth: false,
        errors: '',
        form: {
            mail: '',
            password: ''
        },
    });
});

router.post('/',[
    check('username','ユーザー名記入してください').notEmpty().escape(),
    check('mail','メールアドレスを記入してください').isEmail().escape(),
    check('password').custom((value, {req})=>{
        if(req.body.password == "" || req.body.password_confirmation == ""){throw new Error('パスワードを記入してください');}
        if(req.body.password !== req.body.password_confirmation){throw new Error('パスワードが一致していません');}
        return true;
    })
],(req,res,next)=>{
    const errors = validationResult(req);
    const username = req.body.username;
    const mail = req.body.mail;
    const password = req.body.password;
    const password_confirmation = req.body.password_confirmation;

    if(!errors.isEmpty()){
        const errors_arr = errors.array();
        res.render('signup',{
            isAuth: false,
            errors: errors_arr,
            form: {
                username: username,
                mail: mail,
                password: password,
                password_confirmation: password_confirmation
            },
        });
        return;
    }

    const errors_arr = [];
    connection.query(query.getUserInfo(username,mail),(err,result,fields)=>{
        console.log(result);

        if(result[0] !== undefined){
            if(result[0].name == username){
                errors_arr.push ({
                    msg: "ユーザー名が既に使われています",
                    param: "username",
                });
            }
            if(result[0].email == mail){
                errors_arr.push ({
                    msg: "メールアドレスが既に使われています",
                    param: "mail",
                });
            }
            res.render('signup',{
                isAuth: false,
                errors: errors_arr,
                form: {
                    username: username,
                    mail: mail,
                    password: password,
                    password_confirmation: password_confirmation
                },
            });
            return;
        }
        connection.query(query.addUserInfo(username,mail,password),(err,result,fields)=>{
            if(result !== undefined){
                res.redirect('/login');
                return;
            }

            res.render('signup',{
                isAuth: false,
                errors: [{
                    param: 'signup_error',
                    msg: '新規登録 失敗'
                }],
                form: {
                    username: username,
                    mail: mail,
                    password: password,
                    password_confirmation: password_confirmation
                },
            });
        });
    });
});

module.exports = router;