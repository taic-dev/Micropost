const express = require('express');
const router = express.Router();
const connection = require('../db/connection');
const query = require('../db/query');
const { check, validationResult } = require('express-validator');


router.post('/',[
    check('username','ユーザー名記入してください').notEmpty().escape(),
    check('mail','メールアドレスを記入してください').isEmail().escape(),
    check('password').custom((value, {req})=>{
        if(req.body.password == "" || req.body.password_confirmation == ""){throw new Error('パスワードを記入してください');}
        if(req.body.password !== req.body.password_confirmation){throw new Error('パスワードが一致していません');}
        return true;
    })
],(req,res,next)=>{
    

    if(session_mail !== mail){
        connection.query(query.getEmail(mail),function(err,result,fields){
            if(result[0] !== undefined){
                res.render('mypage',{
                    isAuth: true,
                    errors: '',
                    message: '既に使用されているメールアドレスです。',
                    form: {
                        username: username,
                        mail: mail,
                        password: password
                    }
                });
                return;
            }
        });
    }

    if(session_username !== username){
        connection.query(query.getUsername(username),(err,result,fields)=>{
            if(result[0] !== undefined){
                res.render('mypage',{
                    isAuth: true,
                    errors: '',
                    message: '既に使用されているユーザー名です。',
                    form: {
                        username: username,
                        mail: mail,
                        password: password
                    }
                });
                return;
            }
        });
    }

    connection.query(query.updateUserInfo(username,mail,password,session_id),function(err,result,fields){
        req.session.username = username;
        req.session.mail = mail;

        res.render('mypage',{
            isAuth: true,
            errors: '',
            message: '変更が完了しました',
            form: {
                username: username,
                mail: mail,
                password: password
            }
        });
    })
});

module.exports = router;