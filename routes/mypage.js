const express = require('express');
const router = express.Router();
const connection = require('../db/connection');

router.get('/',function(req,res,next){
    const session_username = req.session.username;
    const sql = `SELECT name,email,password FROM users WHERE name = '${session_username}'`;
    connection.query(sql,function(err,result,fields){
        console.log(result);
        res.render('mypage',{
            isAuth: true,
            message: '',
            form: {
                username: result[0].name,
                mail: result[0].email,
                password: result[0].password
            }
        });
    });
});

router.post('/',function(req,res,next){
    const session_username = req.session.username;
    const username = req.body.username;
    const mail = req.body.mail;
    const password = req.body.password;
    const password_confirmation = req.body.password_confirmation;

    const sql = `UPDATE users SET name='${username}',email='${mail}',password='${password}' WHERE name='${session_username}'`;
    connection.query(sql,function(err,result,fields){
        console.log(result);
        res.render('mypage',{
            isAuth: true,
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