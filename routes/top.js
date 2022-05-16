const express = require('express');
const router = express.Router();
const connection = require('../db/connection');

/* GET home page. */
router.get('/', function(req, res, next) {
  const sql = `SELECT * FROM microposts ORDER BY id DESC`;
  connection.query(sql,function(err,result,fields) {
    if(err) throw err;
    console.log(result);
    res.render('top',{
      microposts: result
    });
  });
});

router.post('/',function(req, res, next) {
  const text = req.body.text;
  const sql = `INSERT INTO microposts (message,user_id) VALUES ('${text}',1)`;
  
  connection.query(sql,function(err,result,fields) {
    if(err) throw err;
    console.log(result);
    res.redirect('/top');
  })
});

module.exports = router;
