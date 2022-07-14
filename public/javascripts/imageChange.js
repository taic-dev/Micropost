/************************
 * Image change  JavaScript
************************/
const fileChange = document.getElementById("file-change");
fileChange.addEventListener('change',(event)=>{
    let image = document.getElementById("image");
    let url = event.target.files[0];
    image.setAttribute('src',URL.createObjectURL(url));
});

