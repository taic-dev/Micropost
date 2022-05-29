const express = require('express');
const router = express.Router();
const connection = require('../db/connection');

router.post('/',function(req,res,next){
    const username = req.session.username;
    const micropost_id = req.body.micropost_id
    const sql = `UPDATE microposts set delete_flag = '1' WHERE id = ${micropost_id}`;
    connection.query(sql,function(err,result,fields){
        if(err) throw err;
        console.log(result);
        res.redirect('/top');
    });
});

module.exports = router;