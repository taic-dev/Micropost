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
    
    judgeProfile: async (req,res,next)=>{
        const errors = validationResult(req);
        const errors_arr = errors.array();
        const session_username = req.session.username;
        const session_mail = req.session.mail;
        const username = req.body.username;
        const mail = req.body.mail;
        const password = req.body.password;

        if(!errors.isEmpty()){
            res.render('edit',{
                isAuth: false,
                errors: errors_arr,
                message: "",
                form: {
                    username: username,
                    mail: mail,
                    password: password,
                },
            });
            return;
        }

        if(session_mail !== mail){
            await db.User.findAll({
                where: {
                    email: mail
                }
            }).then(result => {
                if(result[0] !== undefined){
                    
                    errors_arr.push({
                        value: mail,
                        msg: '既に使用されているメールアドレスです。',
                        param: 'mail',
                        location: 'body'
                    });
                    
                    res.render('edit',{
                        isAuth: true,
                        errors: errors_arr,
                        message: "",
                        form: {
                            username: username,
                            mail: mail,
                            password: password
                        }
                    });
                    return false;
                }
            });
        }

        if(session_username !== username){
            await db.User.findAll({
                where: {
                    name: username
                }
            }).then(result => {
                if(result[0] !== undefined){
    
                    errors_arr.push({
                        value: username,
                        msg: '既に使用されているユーザー名です。',
                        param: 'username',
                        location: 'body'
                    });
    
                    res.render('edit',{
                        isAuth: true,
                        errors: errors_arr,
                        message: "",
                        form: {
                            username: username,
                            mail: mail,
                            password: password
                        }
                    });
                    return false;
                }
            });
        }
        next();
    },
    
    changeProfile: (req,res,next)=>{
        console.log("//////////////////////////////////////////////success////////////////////////////////////////////////////");
        
        const session_id = req.session.user_id;
        const username = req.body.username;
        const mail = req.body.mail;
        const password = req.body.password;

        db.User.update(
            { name: username, email: mail, password: password },
            { where: {id: session_id}}
        )
        req.session.username = username;
        req.session.mail = mail;

        res.render('edit',{
            isAuth: true,
            errors: '',
            message: '変更が完了しました',
            form: {
                username: username,
                mail: mail,
                password: password
            }
        });
    }

}

module.exports = editController;