const db = require('../models');

const errorController = {

    issetUser: (req,res,next) => {
        const userName = req.params.userName;

        db.User.findAll({
            where: {
                name: userName
            }
        }).then(result => {
            if(!result[0]){
                res.render('error',{
                    message: "Not Found",
                    error: {
                        status: 404,
                        stack: ""
                    }
                });
                return
            }
        });

        res.locals.userName = req.params.userName;

        next();
    },
}

module.exports = errorController;