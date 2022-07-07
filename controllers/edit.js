const db = require("../models");
const { check, validationResult } = require('express-validator');

const editController = {
    showEditPage: async (req,res,next)=>{
        const session_username = req.session.username;

        const result = await db.User.findAll({
            where: {
                name: session_username
            }
        });

        if(result[0] !==undefined){
            req.session.img = result[0].img;
            res.render('edit',{
                isAuth: true,
                errors: '',
                message: '',
                form: {
                    username: result[0].name,
                    mail: result[0].email,
                    password: result[0].password,
                    img: result[0].img
                }
            });
        }
    },
    
    judgeProfile: async (req,res,next)=>{
        const errors = validationResult(req);
        const errors_arr = errors.array();
        const session_username = req.session.username;
        const session_mail = req.session.mail;
        const username = req.body.username;
        const mail = req.body.mail;
        const password = req.body.password;

        console.log(req.file);

        if(req.file !== undefined){
            res.locals.image = req.file.originalname;
        }else{
            res.locals.image = req.session.img;
        }

        if(!errors.isEmpty()){
            res.render('edit',{
                isAuth: false,
                errors: errors_arr,
                message: "",
                form: {
                    username: username,
                    mail: mail,
                    password: password,
                    img: res.locals.image
                },
            });
            return;
        }

        if(session_mail !== mail){
            const result = await db.User.findAll({
                where: {
                    email: mail
                }
            });
            
            if(result[0] !== undefined) {
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
                        password: password,
                        img: res.locals.image
                    }
                });
                return false;
            }
                
        }

        if(session_username !== username){
            const result = await db.User.findAll({
                where: {
                    name: username
                }
            });

            if(result[0] !== undefined) {
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
                        password: password,
                        img: res.locals.image
                    }
                });
                return false;
            }
        }

        next();
    },
    
    changeProfile: (req,res,next)=>{
        const session_id = req.session.user_id;
        const username = req.body.username;
        const mail = req.body.mail;
        const password = req.body.password;

        db.User.update(
            { name: username, email: mail, password: password, img: res.locals.image },
            { where: {id: session_id}}
        )
        req.session.username = username;
        req.session.mail = mail;
        req.session.image = res.locals.image

        res.render('edit',{
            isAuth: true,
            errors: '',
            message: '変更が完了しました',
            form: {
                username: username,
                mail: mail,
                password: password,
                img: res.locals.image
            }
        });
    },

    deleteAccount: async (req,res,next)=>{
        const username = req.params.userName;

        const result = await db.User.update(
            { delete_flag: 1 },
            { where: {name: username}}
        );

        res.redirect('/');
    },
}

module.exports = editController;