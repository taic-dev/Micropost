const express = require('express');
const router = express.Router();

router.get('/',(req,res,next)=>{
    res.render('index',{
        isAuth: false
    });
});

module.exports = router;
