const editController = {
    showEdit: (req,res,next)=>{
        res.render('edit',{
            isAuth: true
        });
    }
}

module.exports = editController;