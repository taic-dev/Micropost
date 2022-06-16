const LogoutController = {
    doLogout: (req,res,next)=>{
        req.session.destroy((err)=>{
            res.redirect('/login');
        });
    }
}

module.exports = LogoutController;