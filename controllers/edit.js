const db = require("../models");

const editController = {
    showEdit: (req,res,next)=>{
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
    }
}

module.exports = editController;