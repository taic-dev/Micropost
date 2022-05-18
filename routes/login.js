const express = require('express');
const app = require('../app');
const router = express.Router();
const connection = require('../db/connection');

router.get('/',function(req,res,next){
    res.render('login',{
        isAuth: false
    });
});

router.post('/',function(req,res,next){
    const mail = req.body.mail;
    const password = req.body.password;

    const sql = `SELECT id , name FROM users WHERE email='${mail}' AND password='${password}'`;
    connection.query(sql,function(err,result,fields){
        if(err) throw err;
        console.log(result);
        if(result[0] !== undefined){
            req.session.user_id = result[0].id;
            req.session.username = result[0].name;
            res.redirect('top');
        }else{
            res.redirect('/login');
        }
    });
});

module.exports = router;
