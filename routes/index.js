const express = require('express');
const router = express.Router();
const messageArray = [];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'Micropost',
    messageArray: ''
  });
});

router.post('/', function(req, res, next) {
  const text = req.body['text'];
  messageArray.push(text);

  res.render('index', {
    title: 'Micropost',
    messageArray: messageArray
  });
});

module.exports = router;
