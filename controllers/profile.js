const db = require('../models');

const profileController = {
    
    showProfile: (req,res,next)=>{
        if(!res.locals.userName){
            res.locals.userName = req.session.username;
        }

        db.User.findAll({
            where: {
                name: res.locals.userName
            }
        }).then(result => {
            res.render('profile',{
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
        });
    }
}

module.exports = profileController;