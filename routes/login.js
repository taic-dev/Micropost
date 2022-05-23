const express = require('express');
const app = require('../app');
const router = express.Router();
const connection = require('../db/connection');
const { check, validationResult } = require('express-validator');

router.get('/',function(req,res,next){
    res.render('login',{
        isAuth: false,
        errors: '',
        form: {
            mail: '',
            password: ''
        },
    });
});

router.post('/',[
    check('mail','メールアドレスを記入してください').isEmail().escape(),
    check('password','パスワードを記入してください').notEmpty().escape()
],function(req,res,next){
    const errors = validationResult(req);
    const mail = req.body.mail;
    const password = req.body.password;

    if(!errors.isEmpty()){
        const errors_arr = errors.array();
        res.render('login',{
            isAuth: false,
            errors: errors_arr,
            form: {
                mail: mail,
                password: password
            },
        })
    }else{
        const sql = `SELECT id , name , email FROM users WHERE email='${mail}' AND password='${password}'`;
        connection.query(sql,function(err,result,fields){
            if(err) throw err;

            if(result[0] !== undefined){
                req.session.user_id = result[0].id;
                req.session.username = result[0].name;
                req.session.mail = result[0].email;
                res.redirect('top');
            }else{
                res.render('login',{
                    isAuth: false,
                    errors: [{
                        param: 'login_error',
                        msg: 'ログイン失敗'
                    }],
                    form: {
                        mail: mail,
                        password: password
                    },
                });
            }
        });
    }
});

module.exports = router;
