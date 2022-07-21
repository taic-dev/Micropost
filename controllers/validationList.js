const { check } = require('express-validator');

const validationList = {
    login: [
        check('mail','メールアドレスを記入してください').notEmpty().isEmail().escape(),
        check('password','パスワードを記入してください').notEmpty().escape(),
    ],
    signup: [
        check('username','ユーザー名記入してください').notEmpty().escape(),
        check('mail','メールアドレスを記入してください').isEmail().escape(),
        check('password').custom((value, {req})=>{
            if(req.body.password == "" || req.body.password_confirmation == ""){throw new Error('パスワードを記入してください');}
            if(req.body.password !== req.body.password_confirmation){throw new Error('パスワードが一致していません');}
            return true;
        }),
        check('file').custom((value, {req})=>{
            if(typeof req.file !== 'undefined'){
                const extension = req.file.originalname.split('.').pop();
                const imgSize = req.file.size;
                const extensionsArray = ["png","jpg","jpeg"];
                if(extensionsArray.indexOf(extension) == -1 ){throw new Error('画像はpngかjpg形式を使用してください')}
                if(imgSize >= 1000000){throw new Error('1MB以下のサイズを使用してください')}
            }
            return true;
        })
    ],
    application: [
        check('mail','メールアドレスを記入してください').notEmpty().isEmail().escape()
    ],
    reset: [
        check('mail','メールアドレスを記入してください').notEmpty().isEmail().escape(),
        check('password').custom((value, {req})=>{
            if(req.body.password == "" || req.body.password_confirmation == ""){throw new Error('パスワードを記入してください');}
            if(req.body.password !== req.body.password_confirmation){throw new Error('パスワードが一致していません');}
            return true;
        }),
    ]
}

module.exports = validationList;