require('dotenv').config();
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const db = require('../models');

const resetController = {
    showApplication:(req,res,next)=>{
        res.render('application',{
            isAuth: false,
            errors: '',
            success: ''
        });
    },

    doApplication: async (req,res,next)=>{
        const mail = req.body.mail;
        const randomStr = Math.random().toFixed(36).substring(2,38);
        const token = crypto.createHmac('sha256', process.env.APP_KEY).update(randomStr).digest('hex');
        const passwordResetUrl = process.env.APP_URL + 'reset' + token + '?mail=' + encodeURIComponent(mail);

        const result = await db.User.findAll({
            where: {
                email: mail
            }
        });

        if(!result[0]){
            res.render('application',{
                isAuth: false,
                errors: '存在しないメールアドレスです',
                success: ''
            });
            return;
        }

        console.log(token);
        console.log(mail);

        // updateできない
        const find = db.User.findAll(
            {where: {email: mail}}
        );

        find.token = `${token}`;

        await find.save();

        console.log(find);

        return;
        // updateできない

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
            html: `以下のURLからパスワードの再設定を行ってください。\n\n ${passwordResetUrl}`,
            subject: 'パスワードの再発行メール',
        }

        transporter.sendMail(data,(error,info) => {
            if(error){
                console.log(error);
            }else{
                console.log(info);
            }
        });

        res.render('application',{
            isAuth: false,
            errors: '',
            success: '送付したメールアドレスからパスワードの再設定を行ってください。'
        })

    },

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