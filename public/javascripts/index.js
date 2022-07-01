/************************
 * Logout JavaScript
************************/

function doLogout(){
    if(confirm(`本当にログアウトしますか？`)){
        window.location.href = '/logout';
    }
}

/************************
 * Post delete  JavaScript
************************/
function doDelete(){
    if(confirm(`本当に削除しますか？`)){
        return true;
    }else{
        return false;
    }
}

/************************
 * Image change  JavaScript
************************/
function fileChange(e){
    let image = document.getElementById("image");
    let url = e.target.files[0];
    image.setAttribute('src',URL.createObjectURL(url));
}