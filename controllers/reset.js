require('dotenv').config();
const { check, validationResult } = require('express-validator');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const db = require('../models');

const resetController = {
    showReset: (req,res,next) => {
        res.render('reset',{
            isAuth: false,
            errors: '',
            success: '',
            form: {
                action: req.url,
                mail: '',
                password: '',
                password_confirmation: ''
            }
        });
    },

    judgeReset: async (req,res,next) => {
        const errors = validationResult(req);
        const errors_arr = [];
        const mail = req.body.mail;
        const password = req.body.password;
        const password_confirmation = req.body.password_confirmation;
        const token = req.params.token;

        if(!errors.isEmpty()){
            const errors_arr = errors.array();
            res.render('reset',{
                isAuth: false,
                errors: errors_arr,
                success: '',
                form: {
                    action: req.url,
                    mail: mail,
                    password: password,
                    password_confirmation: password_confirmation
                }
            });
            return;
        }

        const result = await db.User.findAll({
            where: {
                email: mail,
                token: token
            }
        });

        if(!result[0]){
            
            errors_arr.push ({
                msg: "ユーザー情報が一致しないためリセットできません",
                param: "error",
            });

            res.render('reset',{
                isAuth: false,
                errors: errors_arr,
                success: '',
                form: {
                    action: req.url,
                    mail: mail,
                    password: password,
                    password_confirmation: password_confirmation
                }
            })
        }

        res.locals.mail = mail;
        res.locals.password = password;
        res.locals.token = token;
        next();
    },

    doReset: async (req,res,next) => {
        const result = await db.User.update(
            { password: res.locals.password },
            { where: { 
                email: res.locals.mail,
                token: res.locals.token, 
            } }
        );

        if(result !== undefined){
            res.redirect('/login');
            return;
        }
    }
}

module.exports = resetController;