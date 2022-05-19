const express = require('express');
const router = express.Router();
const connection = require('../db/connection');

router.get('/',function(req,res,next){
    const username = req.session.username;
    console.log(username);
    const sql = `SELECT name,email,password FROM users WHERE name = '${username}'`;
    connection.query(sql,function(err,result,fields){
        console.log(result);
        res.render('mypage',{
            isAuth: true,
            form: {
                username: result[0].name,
                mail: result[0].email,
                password: result[0].password
            }
        });
    });
});

module.exports = router;