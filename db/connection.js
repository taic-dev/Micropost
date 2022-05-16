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

module.exports = connection;
