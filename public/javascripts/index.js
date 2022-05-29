const logout = document.querySelector('#logout');

logout.addEventListener('click',(e)=>{
    e.preventDefault();
    if(confirm(`本当にログアウトしますか？`)){
        window.location.href = '/logout';
    }
});

function delete_btn(){
    if(confirm(`本当に削除しますか？`)){
        return true;
    }else{
        return false;
    }
}