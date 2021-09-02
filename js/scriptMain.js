<<<<<<< HEAD
/* Subida de foto */

let usuariosFotos = [];
let imagen = document.getElementById('img').value;
let user = localStorage.getItem('usuarios')
let username = JSON.parse(user)
console.log(username[0]['name'])

function envioFoto(){
    let imagen = document.getElementById('img').value;
    let img = new Image();
    img.src = imagen;
    let foto = document.getElementById('contenedorImg');
    let usuario = document.createElement('p');
    let div = document.createElement('div');
    usuario.innerHTML = username[0]['name'];
    div.append(usuario);
    div.append(img)
    foto.append(div)
    
    div.className = 'foto'
=======
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


let usuariosPost = [];
>>>>>>> 2ca61961dd386c2bc9fe0b07b12f3f8b2a588a4b

let usuarioLog;


if(localStorage.getItem('usuarioLog'))
{
  usuarioLog = JSON.parse(localStorage.getItem('usuarioLog'));
}
<<<<<<< HEAD

/*Consol Log de Links */
let array = JSON.parse(localStorage.getItem('FotoUsuario'))

for(let i = 0; i < JSON.parse(localStorage.getItem('FotoUsuario')).length; i++){
    console.log(array[i]);
=======
else
{
    document.location = 'LogIn.html';
>>>>>>> 2ca61961dd386c2bc9fe0b07b12f3f8b2a588a4b
}

let refresh = confirm('Desea continuar?');

if(refresh == false){
    alert('Hasta luego!')
}else if(refresh == true){
    for(let j = 0; j < JSON.parse(localStorage.getItem('FotoUsuario')).length; j++){
        let nuevoUl = document.createElement('ul');
        let nuevoLi = document.createElement('li');
        img = new Image();
        img.src = array[j];
        nuevoLi.append(img);
        nuevoUl.append(nuevoLi);
        foto.append(nuevoUl );
        
    }
}

if(localStorage.getItem('usuarioPost'))
{
    usuariosPost = JSON.parse(localStorage.getItem('usuarioPost'));
}

window.onload = postsList();

//let imagen = document.getElementById('img').value;

function makePost(){
    let newPost = new Post;

    newPost.id = usuariosPost.length;
    newPost.date = Date.now().toString();
    newPost.mediaLink = document.getElementById('imgPost').value;
    newPost.text = document.getElementById('textPost').value;
    newPost.likes = 0;
    newPost.user = usuarioLog;

    //let imagen = document.getElementById('img').value;
   // let img = new Image();
   // img.src = newPost.mediaLink;
   // let userName = usuarioLog.userName;
   // let foto = document.getElementById('foto');
   // document.write('textPost');
   // let nuevoUl = document.createElement('ul');
   // let nuevoLi = document.createElement('li');
   // 
   // 
   // nuevoLi.append(img);
   // nuevoUl.append(nuevoLi);
   // foto.append(nuevoUl);
   // userName.append()
   // usuariosFotos.push(imagen)
   
   if(newPost.text != "" && newPost.mediaLink != "")
   {
       usuariosPost.push(newPost);
       localStorage.setItem('usuarioPost',JSON.stringify(usuariosPost));
       console.log(usuariosPost);
       window.location.href ="mainred.html";
   }
   else
   {
       console.log("error");
   }
}

function postsList()
{
    //let lista = document.createElement('div');
    //let postsArea = document.createElement('ul');
    //let posts = document.createElement('li');
    //let postContent = document.createElement('div');
    //let postMedia = new Image();
    //let postText = document.createElement('p');
    // 
//
    //lista.append(postsArea);
    
    for(var i = 0; i < usuariosPost.length; i++)
    {

        let nuevoUl = document.createElement('ul');
        let nuevoLi = document.createElement('li');
        let postText = document.createElement('p');
        let postDate = document.createElement('p');
        let postUser = document.createElement('p');
        let foto = document.getElementById('foto');
        
        let img = new Image;

        img.src = usuariosPost[i].mediaLink;
        postText = usuariosPost[i].text;
        postDate = usuariosPost[i].Date;
        postUser = usuarioLog.name;


        nuevoLi.append(postUser);
        nuevoLi.append(img);
        nuevoLi.append(postText);
        nuevoLi.append(postDate);
        nuevoUl.append(nuevoLi);
        foto.append(nuevoUl);
        //console.log(usuariosPost[i].text);
       // postText.value = usuariosPost[i].text;
       // postMedia.src = usuariosPost[i].mediaLink;
       // postsArea.append(postContent);
       // postContent.append(postMedia);
       // postContent.append(postText);
       // console.log(usuariosPost[i]);
        //document.write(usuariosPost[i]);
    }
}
    

   
