const express = require('express');
const router = express.Router();
const connection = require('../db/connection');
const query = require('../db/query');
const { updateDeleteFlag } = require('../db/query');

router.post('/',(req,res,next)=>{
    const username = req.session.username;
    const micropost_id = req.body.micropost_id
    connection.query(query.updateDeleteFlag(micropost_id),(err,result,fields)=>{
        res.redirect('/top');
    });
});

module.exports = router;