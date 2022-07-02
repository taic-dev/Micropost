const user = require("../models/user");

const valueObject = {

    infMaintenance: (result) => {
        const post = [];
        for(let i of result){
            for (let x of i.dataValues.Users){
                // console.log(i.dataValues.createdAt);
                let dt = new Date(i.dataValues.createdAt);
                i.dataValues.createdAt = dt.toLocaleString();
                i.dataValues.img = x.dataValues.img;
            }
            post.push(i.dataValues);
        }
        return post;
    }
}

module.exports = valueObject;