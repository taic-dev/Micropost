const express = require('express');
const router = express.Router();
const connection = require('../db/connection');
const { check, validationResult } = require('express-validator');

router.get('/',function(req,res,next){
    const session_username = req.session.username;
    const sql = `SELECT name,email,password FROM users WHERE name = '${session_username}'`;
    connection.query(sql,function(err,result,fields){
        console.log(result);
        res.render('mypage',{
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
});

router.post('/',[
    check('username','ユーザー名記入してください').notEmpty().escape(),
    check('mail','メールアドレスを記入してください').isEmail().escape(),
    check('password').custom((value, {req})=>{
        if(req.body.password == "" || req.body.password_confirmation == ""){throw new Error('パスワードを記入してください');}
        if(req.body.password !== req.body.password_confirmation){throw new Error('パスワードが一致していません');}
        return true;
    })
],function(req,res,next){
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
        res.render('mypage',{
            isAuth: false,
            errors: errors_arr,
            message: '',
            form: {
                username: username,
                mail: mail,
                password: password,
            },
        });
    }else{

        if(session_username == username && session_mail == mail){
            const sql = `UPDATE users SET password='${password}' WHERE id='${session_id}'`;
            connection.query(sql,function(err,result,fields){
                console.log('err:' + err);
                console.log('result:' + result);
                req.session.username = username;
                req.session.mail = mail;

                res.render('mypage',{
                    isAuth: true,
                    errors: '',
                    message: '変更が完了しました',
                    form: {
                        username: username,
                        mail: mail,
                        password: password
                    }
                })
            });
        }else if(session_username == username){
            const sql = `SELECT * FROM users WHERE email='${mail}'`;
            connection.query(sql,function(err,result,fields){
                console.log('err:' + err);
                if(result[0] !== undefined){
                    res.render('mypage',{
                        isAuth: true,
                        errors: '',
                        message: '既に使用されているメールアドレスです。',
                        form: {
                            username: username,
                            mail: mail,
                            password: password
                    }
                    });
                }else{
                    const sql = `UPDATE users SET name='${username}',email='${mail}',password='${password}' WHERE id='${session_id}'`;
                    connection.query(sql,function(err,result,fields){
                        console.log(result);

                        req.session.username = username;
                        req.session.mail = mail;

                        res.render('mypage',{
                            isAuth: true,
                            errors: '',
                            message: '変更が完了しました',
                            form: {
                                username: username,
                                mail: mail,
                                password: password
                            }
                        });
                    })
                }
            });
        }else if(session_mail == mail){
            const sql = `SELECT * FROM users WHERE name='${username}'`;
            connection.query(sql,function(err,result,fields){
                console.log('err:' + err);
                console.log('result:' + result);
                if(result[0] !== undefined){
                    res.render('mypage',{
                        isAuth: true,
                        errors: '',
                        message: '既に使用されているユーザー名です。',
                        form: {
                            username: username,
                            mail: mail,
                            password: password
                    }
                    });
                }else{
                    const sql = `UPDATE users SET name='${username}',email='${mail}',password='${password}' WHERE id='${session_id}'`;
                    connection.query(sql,function(err,result,fields){
                        console.log(result);

                        req.session.username = username;
                        req.session.mail = mail;

                        res.render('mypage',{
                            isAuth: true,
                            errors: '',
                            message: '変更が完了しました',
                            form: {
                                username: username,
                                mail: mail,
                                password: password
                            }
                        });
                    })
                }
            });
        }else{
            const sql = `SELECT * FROM users WHERE name='${username}' OR email='${mail}'`;
            connection.query(sql,function(err,result,fields){
                if(result[0] !== undefined){
                    res.render('mypage',{
                        isAuth: true,
                        errors: '',
                        message: '既に使用されている情報です',
                        form: {
                            username: username,
                            mail: mail,
                            password: password
                    }
                    });
                }else{
                    const sql = `UPDATE users SET name='${username}',email='${mail}',password='${password}' WHERE id='${session_id}'`;
                    connection.query(sql,function(err,result,fields){
                        console.log(result);

                        req.session.username = username;
                        req.session.mail = mail;

                        res.render('mypage',{
                            isAuth: true,
                            errors: '',
                            message: '変更が完了しました',
                            form: {
                                username: username,
                                mail: mail,
                                password: password
                            }
                        });
                    })
                }
            });
        }
    }
});

module.exports = router;