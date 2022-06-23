const db = require('../models/');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const { check, validationResult } = require('express-validator');

const signupController = {
    showSignup: (req,res,next)=>{
        res.render('signup',{
            isAuth: false,
            errors: '',
            form: {
                mail: '',
                password: ''
            },
        });
    },

    judgeSignup: async (req,res,next)=>{
        const errors = validationResult(req);
        const errors_arr = [];
        const username = req.body.username;
        const mail = req.body.mail;
        const password = req.body.password;
        const password_confirmation = req.body.password_confirmation;
        const iconImage = req.file.originalname;
    
        if(!errors.isEmpty()){
            const errors_arr = errors.array();
            res.render('signup',{
                isAuth: false,
                errors: errors_arr,
                form: {
                    username: username,
                    mail: mail,
                    password: password,
                    password_confirmation: password_confirmation
                },
            });
            return;
        }

        const result = await db.User.findAll({
            where: { 
                [Op.or]: [ 
                    {name: username},
                    {email: mail} 
                ] 
            }
        });
        
        if(result[0] !== undefined){
            if(result[0].name == username){
                errors_arr.push ({
                    msg: "ユーザー名が既に使われています",
                    param: "username",
                });
            }
            if(result[0].email == mail){
                errors_arr.push ({
                    msg: "メールアドレスが既に使われています",
                    param: "mail",
                });
            }
            res.render('signup',{
                isAuth: false,
                errors: errors_arr,
                form: {
                    username: username,
                    mail: mail,
                    password: password,
                    password_confirmation: password_confirmation
                },
            });
            return;
        }

        res.locals.username = username;
        res.locals.mail = mail;
        res.locals.password = password;
        res.locals.image = iconImage;
        next();
    },

    doSignup: async (req,res,next) => {

        if(res.locals.image === undefined){
            res.locals.image = "sample.png";
        }
        
        const result = await db.User.create({
            name: res.locals.username,
            email: res.locals.mail,
            password: res.locals.password,
            img: res.locals.image,
            delete_flag: 0
        })

        if(result !== undefined){
            res.redirect('/login');
            return;
        }
    }
}

module.exports = signupController;