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
let usuarioProfile;

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

profilePic.height = 50;
profilePic.width = 50;
profilePic.style.padding = "10px";

linkName.style.textDecoration = "none";
linkName.style.color = "black";
linkName.style.fontSize = ""





if(linkName.click)
{
    usuarioProfile = usuarioLog;
    localStorage.setItem('usuarioProfile', JSON.stringify(usuarioProfile));
}


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
        let foto = document.getElementById('contenedorImg');
        let userDiv = document.createElement('div');
        let userpic = new Image;

        let img = new Image;

        img.src = usuariosPost[i].mediaLink;
        postText.innerText = usuariosPost[i].text;
        postDate.innerText = new Date(usuariosPost[i].date).toLocaleDateString();
        console.log(postDate);
        postUser.innerText = usuariosPost[i].user.name;
        userpic.src = usuariosPost[i].user.profilePic;
       
        
        userpic.width = 50;
        userpic.height = 50;

        userpic.style.height = "50px";
        userpic.style.width = "50px";

        userDiv.style.display = "inline-flex";
        userDiv.style.textAlign = "center";
        userDiv.style.marginTop = "0px";

        postUser.style.paddingTop = "10px";
        postUser.style.paddingLeft = "10px";

        postText.style.marginTop = "10px";
        postText.style.marginBottom = "20px";
        postText.style.padding = "20px"
        postText.style.backgroundColor = "#f3edc9"

        foto.height = 400;
        foto.width = 600;
        foto.style.marginTop = "20px";
        foto.style.paddingBottom = "10px";
        foto.style.paddingTop = "10px";
        foto.style.backgroundColor = "#f3edc9"; 

        nuevoLi.style.listStyle = "none";
        
        userDiv.append(userpic, postUser);
        nuevoLi.append(userDiv);
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
    

   
