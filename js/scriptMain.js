class Post
{
    constructor(id, user, text, mediaLink, likes, date)
    {
        this.id = id;
        this.user = user;
        this.text = text;
        this.mediaLink = mediaLink;
        this.likes = likes;
        this.date = date;
    }
}
console.log(usuarioLog);

let usuariosPost = [];

if(localStorage.getItem('usuariosPosts'))
{
    usuariosPost = JSON.parse(localStorage.getItem('usuariosPosts'));
}


let imagen = document.getElementById('img').value;

function envioFoto(){
    let newPost = new Post;

    newPost.id = usuariosPost.length;
    newPost.date = Date.now;
    newPost.mediaLink = document.getElementById('imgPost');
    newPost.text = document.getElementById('textPost');
    newPost.likes = 0;
    newPost.user = usuarioLog;

    //let imagen = document.getElementById('img').value;
    //let img = new Image();
    img.src = imagen;
    let foto = document.getElementById('foto');
    let nuevoUl = document.createElement('ul');
    let nuevoLi = document.createElement('li');
    nuevoLi.append(img)
    nuevoUl.append(nuevoLi);
    foto.append(nuevoUl );

    usuariosFotos.push(imagen)

    let bd = localStorage.setItem('FotoUsuario',JSON.stringify(usuariosFotos))
    
    
}
let array = JSON.parse(localStorage.getItem('FotoUsuario'))
for(let i = 0; i < JSON.parse(localStorage.getItem('FotoUsuario')).length; i++){
    console.log(array[i]);
}


   
