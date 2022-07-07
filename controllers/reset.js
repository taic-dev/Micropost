require('dotenv').config();
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const db = require('../models');

const resetController = {
    showReset: (req,res,next) => {
        res.render('reset',{
            isAuth: false,
            errors: '',
            success: '',
            token: req.params.token,
            mail: req.query.mail
        });
    },

    doReset: (req,res,next) => {
        
    }


}

module.exports = resetController;