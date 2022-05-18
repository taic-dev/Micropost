const express = require('express');
const router = express.Router();
const connection = require('../db/connection');

router.get('/',function(req,res,next){
    res.render('signup',{
        isAuth: false
    });
});

router.post('/',function(req,res,next){
    const username = req.body.username;
    const mail = req.body.mail;
    const password = req.body.password;
    const password_confirmation = req.body.password_confirmation;
    const sql = `INSERT INTO users (name,email,password,isAdmin) VALUES ('${username}','${mail}','${password}',0)`

    connection.query(sql,function(err,result,fields){
        if(err) throw err;
        console.log(result);
        res.redirect('/login');
    })
});

module.exports = router;