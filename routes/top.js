const express = require('express');
const router = express.Router();

// DB接続
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'Micropost'
});

// 接続の確認
connection.connect(function(err){
  if(err) throw err ;
  console.log('Connected');
});

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
