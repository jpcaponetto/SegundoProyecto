///creando la clase para Publicaciones///////////////////////////////////
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
///creando la clase para Publicaciones///////////////////////////////////



let usuariosPost = [];
let allPosts = [];
let usuarioLog ;
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
    allPosts = JSON.parse(localStorage.getItem('usuarioPost'));
}
if(!usuarioLog.isAdmin)
{
   usuariosPost = allPosts.filter(post => post.user.id == usuarioLog.id || usuarioLog.friendsList.includes(post.user.mail));
   usuariosPost = usuariosPost.reverse();
}
else
{
    usuariosPost = allPosts;
    usuariosPost = usuariosPost.reverse();
}




window.onload = postsList();
window.onload = sugestUsers();

///poblando div del ususario/////////////////////////
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
///poblando div del ususario/////////////////////////

//funcion del boton de nueva publicacion////////
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
//funcion del boton de nueva publicacion////////

//funcion que muestra las publicaciones////////////
function postsList()
{
    
    for(var i = 0; i < usuariosPost.length; i++)
    {

        let nuevoUl = document.createElement('ul');
        let nuevoLi = document.createElement('li');
        let postText = document.createElement('p');
        let postDate = document.createElement('p');
        let postUser = document.createElement('p');
        let foto = document.getElementById('contenedorImg');
        let userDiv = document.createElement('div');
        let postLikes = document.createElement("h6");
        let buttonLike = document.createElement("button");
        let buttonAdmin = document.createElement("button");
        let userpic = new Image;

        let img = new Image;

        let currentpost = usuariosPost[i];

        if(usuarioLog.isAdmin)
        {
           buttonAdmin.classList.toggle("btn");
           buttonAdmin.classList.toggle("btn-warning");
           buttonAdmin.value = "Borrar";
           buttonAdmin.innerText = "Borrar";
           buttonAdmin.style.marginLeft = "200px";
        }

        buttonAdmin.onclick = function()
        {
            if(confirm("¿Seguro que desea borrar este post? si lo borra no se podra recuperar."))
            {
                allPosts.splice(allPosts.findIndex(x => x == currentpost),1);
                localStorage.setItem('usuarioPost',JSON.stringify(allPosts));
                document.location = "mainred.html";
            }

        }


        img.src = usuariosPost[i].mediaLink;
        postText.innerText = usuariosPost[i].text;
        postLikes.innerText =  usuariosPost[i].likes.length + "Likes ";
        postDate.innerText = "Publicado el " + new Date(usuariosPost[i].date).toLocaleDateString();
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

        postLikes.classList.toggle("card-list-item");
        postDate.classList.toggle("card-list-item");

        buttonLike.classList.toggle("btn");
        buttonLike.classList.toggle("btn-primary");
        buttonLike.value = "Like";
        buttonLike.innerText = "Like";
        
      

       buttonLike.onclick = function() 
        { 


          let usuarioLog;

          if(localStorage.getItem('usuarioLog'))
           {
             usuarioLog = JSON.parse(localStorage.getItem('usuarioLog'));
            }
           else 
           {
             document.location = 'LogIn.html';
           }

   
           let validate = currentpost.likes.find(like => like == usuarioLog.mail); 

           console.log(validate);
 

           usuariosPost = usuariosPost.reverse();
           
           if(!validate)
           {
              currentpost.likes.push(usuarioLog.mail);
              localStorage.setItem('usuarioPost',JSON.stringify(allPosts));
               document.location = "mainred.html";
               console.log(currentpost.likes);
           }
           if(validate)
           {
              currentpost.likes.splice(currentpost.likes.findIndex(x => x === usuarioLog.mail), 1);
              localStorage.setItem('usuarioPost',JSON.stringify(allPosts));
              document.location = "mainred.html";
              console.log(currentpost.likes);
           }
       
        }

        
        userDiv.append(userpic, postUser);
        if(usuarioLog.isAdmin)
        {
           userDiv.append(buttonAdmin);
        }
        nuevoLi.append(userDiv);
        nuevoLi.append(img);
        nuevoLi.append(postText);
        nuevoLi.append(postLikes);
        nuevoLi.append(postDate);
        nuevoLi.append(buttonLike);
        nuevoUl.append(nuevoLi);
        foto.append(nuevoUl);

        
    }
}
//funcion que muestra las publicaciones////////////

//funcion que muestra las sugerencias de amistad/////////////////    
function sugestUsers()
{

    let allUsers = JSON.parse(localStorage.getItem('usuarios'));
     
    let friendList = usuarioLog.friendsList;

    let userList;
    if(!usuarioLog.isAdmin)
    {
       userList  = allUsers.filter(users => users.id != usuarioLog.id && !friendList.includes(users.mail));
    }
    else
    {
        userList = allUsers;
    }
    
    console.log(userList);
    console.log(usuarioLog.friendsList);

     
    for(var i = 0; i < userList.length; i++)
    {
        let users = document.getElementById("friendList");
        let usersUL = document.createElement('ul');
        let usersLI = document.createElement('li');
        let userName = document.createElement('a');
        let userDiv = document.createElement('div');
        let friendButton = document.createElement('button');
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
       
        let newFriend = userList[i];
        friendButton.classList.toggle("btn");
        friendButton.classList.toggle("btn-primary");
        friendButton.innerText = "Seguir"
        friendButton.style.marginLeft = "10px"
        friendButton.onclick = function()
        {
            console.log(newFriend);
           
            if(!friendList.includes(newFriend.id))
            {
              friendList.push(newFriend.mail);
            }
            else
            {
            }

            usuarioLog.friendsList = friendList;

            console.log(usuarioLog.friendsList);

            allUsers.splice(usuarioLog.id, 1, usuarioLog);

            localStorage.setItem('usuarios', JSON.stringify(allUsers));

            localStorage.setItem('usuarioLog', JSON.stringify(usuarioLog));

            document.location = "mainred.html"

            console.log(allUsers);

        }

        userPic.src = userList[i].profilePic;
        userPic.style.borderRadius = "25px";
        userPic.width = 50;
        userPic.height = 50;

        userDiv.append(userPic);
        userDiv.append(userName);
        userDiv.append(friendButton);
        usersLI.append(userDiv);
        usersUL.append(usersLI);
        users.append(usersUL);
    }
}
//funcion que muestra las sugerencias de amistad/////////////////    
  
