const query = {
    getAllPost:`SELECT * FROM microposts WHERE delete_flag = 0`,
    addPost:(text,user_id,username)=>{return `INSERT INTO microposts (message,user_id,username) VALUES ('${text}','${user_id}','${username}')`;}
    
}

module.exports = query;
