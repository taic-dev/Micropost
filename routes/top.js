const express = require('express');
const router = express.Router();
const connection = require('../db/connection');

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.username){
    const user_id = req.session.user_id;
    const username = req.session.username;
    const isAuth = Boolean(user_id);
    const sql = `SELECT * FROM microposts ORDER BY id DESC LIMIT 5`;
    connection.query(sql,function(err,result,fields) {
      if(err) throw err;
      console.log("result"+result);
      res.render('top',{
        microposts: result,
        username: username,
        isAuth: isAuth
      });
    });
  }else{
    res.redirect('/');
  }
});

router.post('/',function(req, res, next) {
  const user_id = req.session.user_id;
  const username = req.body.username;
  const text = req.body.text;
  console.log('id'+user_id);
  const sql = `INSERT INTO microposts (message,user_id,username) VALUES ('${text}','${user_id}','${username}')`;
  
  connection.query(sql,function(err,result,fields) {
    if(err) throw err;
    res.redirect('/top');
  })
});

module.exports = router;
