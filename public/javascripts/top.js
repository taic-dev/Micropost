/************************
 * top JavaScript
************************/

// Logout JavaScript
const logout = document.getElementById("logout");
logout.addEventListener('click',()=>{
    doLogout();
});

function doLogout(){
    if(confirm(`本当にログアウトしますか？`)){
        window.location.href = '/logout';
    }
}

// Delete Post JavaScript
const deleteForm = document.getElementsByClassName('delete_post');
const deleteForms = Array.from(deleteForm);
deleteForms.forEach((target)=>{
    target.addEventListener('submit',(event)=>{
        event.preventDefault();
        if(confirm(`本当に削除しますか？`)){
            target.submit();
        }else{
            return false;
        }
    });
})
