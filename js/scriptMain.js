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

let usuarioLog;


if(localStorage.getItem('usuarioLog'))
{
  usuarioLog = JSON.parse(localStorage.getItem('usuarioLog'));
}
else
{
    document.location = 'LogIn.html';
}


if(localStorage.getItem('usuarioPost'))
{
    usuariosPost = JSON.parse(localStorage.getItem('usuarioPost'));
}

window.onload = postsList();

//let imagen = document.getElementById('img').value;

let avatar = document.createElement("div");
let avatarDiv = document.getElementById("avatarUsuario");
let linkName = document.createElement("a");
let profilePic = new Image;



profilePic.src = usuarioLog.profilePic;
linkName.href = "userProfile.html";
linkName.innerText = usuarioLog.name.toString();

avatar.append(linkName);
avatar.append(profilePic);

avatarDiv.append(avatar);



function makePost(){
    let newPost = new Post;

    newPost.id = usuariosPost.length;
    newPost.date = Date();
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
        postDate = new Date(usuariosPost[i].date).toLocaleDateString();
        console.log(postDate);
        postUser = usuariosPost[i].user.name;
       
        

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
    

   
