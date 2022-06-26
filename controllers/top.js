const valueObject = require('./valueObject');
const { sequelize } = require("../models");
const db = require("../models");

const topController = {

    showTop: async (req, res, next) => {
        if(req.session.username){
            const user_id = req.session.user_id;
            const username = req.session.username;
            const isAuth = Boolean(user_id);

            const result = await db.User.findAll({
                include: [{ 
                        model: db.Microposts,
                        required: true
                }],
                where: {
                    delete_flag: 0
                }
            });

            const post = valueObject.infMaintenance(result);

            res.render('top',{
                microposts: post,
                username: username,
                isAuth: isAuth
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
    },
    
    deletePost: (req,res,next)=>{
        const username = req.session.username;
        const micropost_id = req.body.micropost_id;

        db.Microposts.update(
            { delete_flag: 1 },
            { where: { id: micropost_id} }
        ).then(result => {
            res.redirect('/top');
        });
    }
}

module.exports = topController;