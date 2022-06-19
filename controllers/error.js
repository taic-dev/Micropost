const errorController = {

    issetUser: (req,res,next) => {
        const userName = req.params.userName;
        const session_username = req.session.username;

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

        next();
    },
}

module.exports = errorController;