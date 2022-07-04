require('dotenv').config();
const nodemailer = require('nodemailer');
const db = require('../models');

const resetController = {
    showReset:(req,res,next)=>{
        res.render('reset',{
            isAuth: false,
            errors: '',
            success: ''
        });
    },

    doReset: async (req,res,next)=>{
        const mail = req.body.mail;

        const result = await db.User.findAll({
            where: {
                email: mail
            }
        });

        if(!result[0]){
            res.render('reset',{
                isAuth: false,
                errors: '存在しないメールアドレスです',
                success: ''
            });
            return;
        }

        // メール送信処理
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_POST,
            secure: process.env.MAIL_SECURE,
            auth:{
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            }
        });

        const data = {
            from: `aaa@example.com`,
            to: `c.t.o.taishi.0530@gmail.com`,
            html: `以下のURLからパスワードの再設定を行ってください。\n\n URL`,
            subject: 'パスワードの再発行メール',
        }

        transporter.sendMail(data,(error,info) => {
            if(error){
                console.log(error);
            }else{
                console.log(info);
            }
        });

        res.render('reset',{
            isAuth: false,
            errors: '',
            success: '送付したメールアドレスからパスワードの再設定を行ってください。'
        })

    }


}

module.exports = resetController;