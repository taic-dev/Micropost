const loginController = {
    showLogin: (req,res,next)=>{
        res.render('login',{
            isAuth: false,
            errors: '',
            form: {
                mail: '',
                password: ''
            },
        });
    },

    


}


module.exports = loginController;