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
window.onload = sugestUsers();

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
    newPost.likes = [];
    newPost.user = usuarioLog;
   
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
    usuariosPost = usuariosPost.reverse();
    
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
        userpic.style.borderRadius = "25px";
        
        userDiv.classList.toggle("card-header")
        userDiv.style.display = "inline-flex";
        userDiv.style.textAlign = "center";
        userDiv.style.marginTop = "0px";

        postUser.style.paddingTop = "10px";
        postUser.style.paddingLeft = "10px";

        postText.classList.toggle("card-text")
        postText.style.marginTop = "10px";
        postText.style.marginBottom = "20px";
        postText.style.padding = "20px";
        postText.style.backgroundColor = "whitesmoke";

        img.height = 500;
        img.width = 600;
      

        foto.classList.toggle("card-img-top")
        foto.style.marginTop = "20px";
        foto.style.paddingBottom = "10px";
        foto.style.paddingTop = "10px";

        nuevoLi.style.listStyle = "none";
        nuevoLi.classList.toggle("card");
        nuevoLi.style.maxWidth = "fit-content";
        nuevoLi.style.minWidth = "fit-content";

        
        userDiv.append(userpic, postUser);
        nuevoLi.append(userDiv);
        nuevoLi.append(img);
        nuevoLi.append(postText);
        nuevoLi.append(postDate);
        nuevoUl.append(nuevoLi);
        foto.append(nuevoUl);

        
    }
}
    
function sugestUsers()
{
    let allUsers = JSON.parse(localStorage.getItem('usuarios'));
     
    let userList  = allUsers.filter(users => users.id != usuarioLog.id);

    for(var i = 0; i < userList.length; i++)
    {
        let users = document.getElementById("friendList");
        let usersUL = document.createElement('ul');
        let usersLI = document.createElement('li');
        let userName = document.createElement('a');
        let userDiv = document.createElement('div');
        let userPic = new Image;
           
        let usuarioProf = userList[i];
        userName.innerText = userList[i].name;
        userName.style.textDecoration = "none";
        userName.style.color = "black";
        userName.onclick = function()
        {
            console.log(usuarioProf);
            
            localStorage.setItem('usuarioProfile', JSON.stringify(usuarioProf));

            document.location = "userProfile.html"
        }
        userName.style.paddingLeft = "5px";
       
        userPic.src = userList[i].profilePic;
        userPic.style.borderRadius = "25px";
        userPic.width = 50;
        userPic.height = 50;

        userDiv.append(userPic);
        userDiv.append(userName);
        usersLI.append(userDiv);
        usersUL.append(usersLI);
        users.append(usersUL);
    }
}
   
