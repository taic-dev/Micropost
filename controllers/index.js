const indexController = {
    showIndex: (req,res,next)=>{
        res.render('index',{
            isAuth: false
        });
    }
}

module.exports = indexController;