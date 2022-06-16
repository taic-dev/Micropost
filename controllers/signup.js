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

    doSignup: (req,res,next)=>{
        const errors = validationResult(req);
        const username = req.body.username;
        const mail = req.body.mail;
        const password = req.body.password;
        const password_confirmation = req.body.password_confirmation;
    
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
    
        const errors_arr = [];

        db.User.findAll({
            where: { 
                [Op.or]: [ 
                    {name: username},
                    {email: mail} 
                ] 
            }
        }).then(result => {
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
    
            db.User.create({
                name: username,
                email: mail,
                password: password
            }).then(result => {
                if(result !== undefined){
                    res.redirect('/login');
                    return;
                }
    
                res.render('signup',{
                    isAuth: false,
                    errors: [{
                        param: 'signup_error',
                        msg: '新規登録 失敗'
                    }],
                    form: {
                        username: username,
                        mail: mail,
                        password: password,
                        password_confirmation: password_confirmation
                    },
                });
            });
        });
    }
}

module.exports = signupController;