const query = {
    getAllPost: `SELECT * FROM microposts WHERE delete_flag = 0`,
    addPost: (text,user_id,username)=>{ return `INSERT INTO microposts (message,user_id,username) VALUES ('${text}','${user_id}','${username}')`},
    getUserInfoLogin: (mail,password)=>{ return `SELECT id , name , email FROM users WHERE email='${mail}' AND password='${password}'`},
    getUserInfo: (username,mail)=>{ return`SELECT * FROM users WHERE name = '${username}' OR email = '${mail}'`},
    addUserInfo: (username,mail,password)=>{ return `INSERT INTO users (name,email,password,isAdmin) VALUES ('${username}','${mail}','${password}',0)`},
    updateDeleteFlag: (micropost_id)=>{ return `UPDATE microposts set delete_flag = '1' WHERE id = ${micropost_id}`},
    getUserInfoMypage: (session_username)=>{ return `SELECT name,email,password FROM users WHERE name = '${session_username}'`},
    updatePassword: (password,session_id)=>{ return `UPDATE users SET password='${password}' WHERE id='${session_id}'`},
    getEmail: (mail)=>{ return `SELECT * FROM users WHERE email='${mail}'`},
    getUsername: (username)=>{ return `SELECT * FROM users WHERE name='${username}'`},
    getEmailUsername: (username,mail)=>{ return `SELECT * FROM users WHERE name='${username}' OR email='${mail}'`},
    updateUserInfo: (username,mail,password,session_id)=>{ return `UPDATE users SET name='${username}',email='${mail}',password='${password}' WHERE id='${session_id}'`}

}

module.exports = query;
