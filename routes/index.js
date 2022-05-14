const express = require('express');
const router = express.Router();
require('date-utils');
const messageArray = [];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'Micropost',
    username: 'テストタロウ',
    messageArray: ''
  });
});

router.post('/', function(req, res, next) {
  const username = req.body['username'];
  const text = req.body['text'];
  const date = new Date();
  const currentTime = date.toFormat('YYYY/MM/DD HH24:MI:SS')
  messageArray.push([text,currentTime]);
  console.log(messageArray);

  res.render('index', {
    title: 'Micropost',
    username: username,
    messageArray: messageArray
  });
});

module.exports = router;
