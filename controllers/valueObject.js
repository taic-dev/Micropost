// class User {
//     constructor(data) {
//        this._data = data
//     }

const user = require("../models/user");

//     userName(){
//         return this._data.user_name
//     }

//     age(){

//     }

//     infMaintenance(){

//     }

//     data(){
//         return {
//             userName:this.userName
//             age:this.age,
//         }
//     }
// }
const valueObject = {

    infMaintenance: (result) => {
        const post = [];

        // console.log(result.length);
        
        // for(let i=0;i<=result.length;i++){
        //     console.log(result[i]);
        // }

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