const db = require('../models/');
const { check, validationResult } = require('express-validator');

const loginController = {
    showLogin: (req,res,next)=>{
        res.render('login',{
            isAuth: false,
            errors: '',
            form: {
                mail: '',
                password: ''
            },
        });
    },
    
    doLogin: (req,res,next)=>{
        const errors = validationResult(req);
        const mail = req.body.mail;
        const password = req.body.password;

        if(!errors.isEmpty()){
            const errors_arr = errors.array();
            res.render('login',{
                isAuth: false,
                errors: errors_arr,
                form: {
                    mail: mail,
                    password: password
                },
            });
            return;
        }

        db.User.findAll({
            where: {
                email: mail,
                password: password,
                delete_flag: 0
            }
        }).then(result => {
            if(result[0] !== undefined){
                req.session.user_id = result[0].id;
                req.session.username = result[0].name;
                req.session.mail = result[0].email;
                req.session.image = result[0].img;
                res.redirect('top');
                return;
            }

            res.render('login',{
                isAuth: false,
                errors: [{
                    param: 'login_error',
                    msg: 'ログイン失敗'
                }],
                form: {
                    mail: mail,
                    password: password
                },
            });
        })
    }
}

module.exports = loginController;