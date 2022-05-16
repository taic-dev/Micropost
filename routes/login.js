const express = require('express');
const router = express.Router();
const connection = require('../db/connection');

router.get('/',function(req,res,next){
    res.render('login');
});

router.post('/',function(req,res,next){
    const mail = req.body.mail;
    const password = req.body.password;

    const sql = `SELECT * FROM users WHERE email='${mail}' AND password='${password}'`;
    connection.query(sql,function(err,result,fields){
        if(err) throw err;
        if(result[0] !== undefined){
            res.redirect('/top');
        }else{
            res.redirect('/login');
        }
    });
});

module.exports = router;
