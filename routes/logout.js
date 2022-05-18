const express = require('express');
const router = express.Router();

router.get('/logout',function (req,res,next){
    req.session.destroy((err)=>{
        res.redirect('/login');
    })
});

module.exports = router;