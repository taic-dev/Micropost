const db = require('../models');

const profileController = {
    showProfile: (req,res,next)=>{
        const session_username = req.session.username;
        const userName = req.params;
        console.log(userName);

        db.User.findAll({
            where: {
                name: session_username
            }
        }).then(result => {
            res.render('profile',{
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
    }
}

module.exports = profileController;