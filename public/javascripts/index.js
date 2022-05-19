const logout = document.querySelector('#logout');

logout.addEventListener('click',(e)=>{
    e.preventDefault();
    if(confirm(`本当にログアウトしますか？`)){
        window.location.href = '/logout';
    }
});