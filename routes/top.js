const express = require('express');
const router = express.Router();
const connection = require('../db/connection');
const query = require('../db/query');

router.get('/',(req, res, next) => {
  if(req.session.username){
    const user_id = req.session.user_id;
    const username = req.session.username;
    const isAuth = Boolean(user_id);
    connection.query(query.getAllPost,(err,result,fields) => {
      res.render('top',{
        microposts: result,
        username: username,
        isAuth: isAuth
      });
    });
    return;
  }
  res.redirect('/');
});

router.post('/',(req, res, next) => {
  const user_id = req.session.user_id;
  const username = req.body.username;
  const text = req.body.text;
  connection.query(query.addPost(text,user_id,username),(err,result,fields) => {
    res.redirect('/top');
  })
});

module.exports = router;