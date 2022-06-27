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
            // console.log(i.dataValues.Users);
            // return;
            // console.log();
            for (let x of i.dataValues.Users){
                i.dataValues.img = x.dataValues.img;
            }
            post.push(i.dataValues);
        }
        console.log(post);

        return post;


        // for(let i of result) {
        //     // console.log(result)
        //     for(let x of result){
        //         // console.log(x);
        //         post.push(x.dataValues);
        //         // console.log(post);
        //         for(let y of x.dataValues.Users){
        //             let img;
        //             img = y.dataValues.img;
        //             console.log(img);
        //             // post.push(y.dataValues);
        //         }
        //     }
        // }
        console.log(post);
        return post;
    }
}

module.exports = valueObject;