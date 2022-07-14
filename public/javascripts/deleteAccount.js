/************************
 * Account delete  JavaScript
************************/
const deleteAccount = document.getElementById("delete-account");
deleteAccount.addEventListener('click',()=>{
    const userName = document.getElementById('username').value;
    const result = prompt('アカウントを削除する場合は、ユーザー名を入力してください');
    if(userName == result){
        location.href=`/delete-account/${result}`;
    }else{
        return false;
    }
});
