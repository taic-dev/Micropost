const db = require("../models");
const { check, validationResult } = require('express-validator');

const editController = {
    showEditPage: (req,res,next)=>{
        const session_username = req.session.username;

        db.User.findAll({
            where: {
                name: session_username
            }
        }).then(result => {
            res.render('edit',{
                isAuth: true,
                errors: '',
                message: '',
                form: {
                    username: result[0].name,
                    mail: result[0].email,
                    password: result[0].password
                }
            });
        });
    },

    judgeProfile: (req,res,next)=>{
        const errors = validationResult(req);
        const session_id = req.session.user_id;
        const session_username = req.session.username;
        const session_mail = req.session.mail;
        const username = req.body.username;
        const mail = req.body.mail;
        const password = req.body.password;
        const password_confirmation = req.body.password_confirmation;

        if(!errors.isEmpty()){
            const errors_arr = errors.array();
            console.log(errors_arr);
            res.render('edit',{
                isAuth: false,
                errors: errors_arr,
                message: '',
                form: {
                    username: username,
                    mail: mail,
                    password: password,
                },
            });
            return;
        }
        next();
    },

    changeProfile: (req,res,next)=>{
        console.log("//////////////////////////////////////////////success////////////////////////////////////////////////////");
        
    }

}

module.exports = editController;