const valueObject = {

    infMaintenance: (result) => {
        const post = [];

        for(let i of result) {
            console.log(result)
            for(let x of result){
                let img = x.dataValues.img;
                for(let y of x.Microposts){
                    y.dataValues.img = img;
                    post.push(y.dataValues);
                }
            }
        }

        return post;
    }
}

module.exports = valueObject;