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

//* Modal *//
const editBtn = document.querySelector('.edit-btn');
const closeBtn = document.querySelector('.close-btn');
const dialog = document.querySelector('.mypage-detail');

editBtn.addEventListener('click',()=>{dialog.show();});
closeBtn.addEventListener('click',()=>{dialog.close();});
