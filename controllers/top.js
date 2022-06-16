const db = require("../models");

const topController = {
    showTop: (req, res, next) => {
        if(req.session.username){
            const user_id = req.session.user_id;
            const username = req.session.username;
            const isAuth = Boolean(user_id);
            
            db.Microposts.findAll({
                where: {
                    delete_flag: "0"
                }
            }).then(result => {
                res.render('top',{
                microposts: result,
                username: username,
                isAuth: isAuth
                });
            });
            return;
        }
        res.redirect('/');
    },
    addPost: (req, res, next) => {
        const user_id = req.session.user_id;
        const username = req.body.username;
        const text = req.body.text;

        db.Microposts.create({
            user_id: user_id,
            user_name: username,
            message: text,
            delete_flag: 0,
        }).then(result => {
            res.redirect('/top');
        });
    }
}

module.exports = topController;