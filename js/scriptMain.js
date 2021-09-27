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
///variables e inicializacion///////////////////////////////////////
let usuariosPost = [];
let allPosts = [];
let usuarioLog ;
let usuarioProfile;
let darkMode;

if(localStorage.getItem('darkMode'))
{
    darkMode = JSON.parse(localStorage.getItem('darkMode'));
}
else
{
    darkMode = false;
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
}


if(localStorage.getItem('usuarioLog') != "undefined")
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
///variables e inicializacion///////////////////////////////////////

///poblando div del ususario/////////////////////////
let avatar = document.createElement("div");
let avatarDiv = document.getElementById("avatarUsuario");
let linkName = document.createElement("a");
let profilePic = new Image;


profilePic.src = usuarioLog.profilePic;
linkName.href = "userProfile.html";
linkName.innerText = usuarioLog.name.toString();

avatar.append(profilePic);
avatar.append(linkName);

avatarDiv.append(avatar);

profilePic.height = 50;
profilePic.width = 50;
profilePic.style.padding = "10px";
profilePic.style.borderRadius = "25px";

linkName.style.textDecoration = "none";
linkName.style.fontSize = ""

if(linkName.click)
{
    usuarioProfile = usuarioLog;
    localStorage.setItem('usuarioProfile', JSON.stringify(usuarioProfile));
}
///poblando div del ususario/////////////////////////
///Metodos de cuando se carga la pagina//////////////////////////////
window.onload = postsList();
window.onload = sugestUsers();
window.onload = detectTheme();
///Metodos de cuando se carga la pagina//////////////////////////////
//funcion del boton de nueva publicacion////////
function makePost(){
    /// crea un nuevo "Post"/////////////////////
    let newPost = new Post;

    ///da los valores al nuevo Post///////////////////////
    newPost.id = usuariosPost.length;
    newPost.date = Date();
    newPost.mediaLink = document.getElementById('imgPost').value;
    newPost.text = document.getElementById('textPost').value;
    newPost.likes = [];
    newPost.user = usuarioLog;
   
    ///valida si el form de texto no esta vacio///////
   if(newPost.text != "")
   {
       ///pushea el nuevo post en el array de posts////
       usuariosPost.push(newPost);
       ///pushea el array en localstorage/////
       localStorage.setItem('usuarioPost',JSON.stringify(usuariosPost));
       ///recarga la pagina para que se muestre el nuevo post/////
       window.location.href ="mainred.html";
   }
   else
   {
       ///alerta si el form de texto esta vacio////////////
       alert("¡Atencion! El post debe contener texto.")
   }
}
//funcion del boton de nueva publicacion////////

//funcion que muestra las publicaciones////////////
function postsList()
{
    let nuevoUl = document.createElement('ul');
    nuevoUl.className = "tarjeta";
    nuevoUl.style.width = "fit-content";
    nuevoUl.style.marginTop = "100px"
    nuevoUl.style.marginBottom = "100px"
    nuevoUl.style.paddingRight = "30px"
    let allUsers = JSON.parse(localStorage.getItem('usuarios'));
    ///recorre todas las publicaciones que puede ver el usuario logueado////////////
    for(var i = 0; i < usuariosPost.length; i++)
    {
      
        ///crea los elementos de la publicacion//////////////////
        let nuevoLi = document.createElement('li');
        let postText = document.createElement('p');
        let postDate = document.createElement('p');
        let postUser = document.createElement('a');
        let foto = document.getElementById('contenedorImg');
        let userDiv = document.createElement('div');
        let postLikes = document.createElement("h6");
        let buttonLike = document.createElement("button");
        let buttonAdmin = document.createElement("button");
        let userpic = new Image;

        let img = new Image;
        
        let currentpost = usuariosPost[i];

        let usuarioProf = currentpost.user;
        
        ///boton de eliminar publicacion(unicamente visible desde un usuario que sea admin)////////////
        if(usuarioLog.isAdmin)
        {
           buttonAdmin.classList.toggle("btn");
           buttonAdmin.classList.toggle("btn-warning");
           buttonAdmin.value = "Borrar";
           buttonAdmin.innerText = "Borrar";
           buttonAdmin.style.marginLeft = "200px";
        }
        ///funcion de borrar///////////////////////
        buttonAdmin.onclick = function()
        {
            if(confirm("¿Seguro que desea borrar este post? si lo borra no se podra recuperar."))
            {
                allPosts.splice(allPosts.findIndex(x => x == currentpost),1);
                localStorage.setItem('usuarioPost',JSON.stringify(allPosts));
                document.location = "mainred.html";
            }

        }
        ///verifica si el post lleva imagen////////////////////
        if(currentpost.mediaLink != "")
        {
          img.src = usuariosPost[i].mediaLink;

        }
        ///asigna valores en los elementos//////////////////
        postText.innerText = usuariosPost[i].text;
        postLikes.innerText =  usuariosPost[i].likes.length + "Likes ";
        postDate.innerText = "Publicado el " + new Date(usuariosPost[i].date).toLocaleDateString();
        console.log(postDate);
        postUser.innerText = usuariosPost[i].user.name;
        userpic.src = usuariosPost[i].user.profilePic;

        ///da estilos en los elementos de la publicacion////////////////
        userpic.width = 50;
        userpic.height = 50;

        userpic.style.height = "50px";
        userpic.style.width = "50px";
        userpic.style.borderRadius = "25px";
        
        userDiv.classList.toggle("card-header");
        userDiv.style.display = "inline-flex";
        userDiv.style.textAlign = "center";
        userDiv.style.marginTop = "0px";

        postUser.style.paddingTop = "10px";
        postUser.style.paddingLeft = "10px";
        postUser.style.textDecoration = "none"; 
        postUser.style.color = "black";
        postUser.onclick = function()
        {
            localStorage.setItem('usuarioProfile', JSON.stringify(usuarioProf));

            document.location = "userProfile.html"
        }

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
        foto.style.objectFit = "cover";


        nuevoLi.style.listStyle = "none";
        nuevoLi.classList.toggle("card");
        nuevoLi.classList.toggle("mb-3");
        nuevoLi.style.width = "600px";
        nuevoLi.style.maxWidth = "600px"
       
        

        postLikes.classList.toggle("card-list-item");
        postDate.classList.toggle("card-list-item");

        buttonLike.classList.toggle("btn");
        buttonLike.classList.toggle("btn-primary");
        buttonLike.value = "Like";
        buttonLike.innerText = "Like";
      
      ///funcion del boton de like///////////////////////////////
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

        if(darkMode == true)
        {
            
            nuevoLi.style.listStyle = "none";
            nuevoLi.classList.toggle("text-white");
            nuevoLi.classList.toggle("bg-dark");
            postText.classList.toggle("card-text");

            postText.style.backgroundColor = "black";
        }

        ///append a los elementos de la publicacion///////////////
        userDiv.append(userpic, postUser);
        ///si el usuario es administrador appendea el boton de borrar publicacion///////////////
        if(usuarioLog.isAdmin)
        {
           userDiv.append(buttonAdmin);
        }
        nuevoLi.append(userDiv);
        ///appendea img si el post tiene imagen////////////////////// 
        if(img.src != "")
        {
          nuevoLi.append(img);
        }
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
    ///si el usuario no es administrador filtra los usuarios para que solo muestre los que no estas siguiendo//////
    if(!usuarioLog.isAdmin)
    {
       userList  = allUsers.filter(users => users.id != usuarioLog.id && !friendList.includes(users.mail));
    }
    ///si el usuario es administrador muestra todos los usuarios/////////////////////
    else
    {
        userList = allUsers;
    }
    ///recorre el array resultante////////////////
    for(var i = 0; i < userList.length; i++)
    {
        ///crea los elementos del item de usuario////////////////////
        let users = document.getElementById("friendList");
        let mobileList = document.getElementById("mobileFriendList");
        let usersUL = document.createElement('ul');
        let usersLI = document.createElement('li');
        let mobileLI = document.createElement('li');
        let userName = document.createElement('a');
        let mobUserName = document.createElement('a');
        let userDiv = document.createElement('div');
        let mobileUserDiv = document.createElement('div');
        let friendButton = document.createElement('button');
        let userPic = new Image;
        let mobUserPic = new Image;
           

        let usuarioProf = userList[i];

        ///estilos al nombre de usuario que es un link/////////
        userName.innerText = userList[i].name;
        userName.style.textDecoration = "none";
        userName.style.color = "black";
        if(darkMode)
        {
            userName.style.color = "white";
        }
         
        mobUserName.innerText = userList[i].name;
        mobUserName.style.textDecoration = "none";
        mobUserName.style.color = "black";
        if(darkMode)
        {
            mobUserName.style.color = "white";
        }

        ///funcion de ir al perfil del usuario/////////
        userName.onclick = function()
        {
            console.log(usuarioProf);
            
            localStorage.setItem('usuarioProfile', JSON.stringify(usuarioProf));

            document.location = "userProfile.html"
        }
        userName.style.paddingLeft = "5px";
       
        mobUserName.onclick = function()
        {
            console.log(usuarioProf);
            
            localStorage.setItem('usuarioProfile', JSON.stringify(usuarioProf));

            document.location = "userProfile.html"
        }

        let newFriend = userList[i];

        ///estilos al boton de "Seguir"/////////
        friendButton.classList.toggle("btn");
        friendButton.classList.toggle("btn-primary");
        friendButton.innerText = "Seguir"
        friendButton.style.marginLeft = "10px"
        ///funcion de agregar a amigos////////////
        friendButton.onclick = function()
        {
            console.log(newFriend);
           
            if(!friendList.includes(newFriend.id))
            {
              friendList.push(newFriend.mail);
            }

            usuarioLog.friendsList = friendList;

            console.log(usuarioLog.friendsList);

            allUsers.splice(usuarioLog.id, 1, usuarioLog);

            localStorage.setItem('usuarios', JSON.stringify(allUsers));

            localStorage.setItem('usuarioLog', JSON.stringify(usuarioLog));

            document.location = "mainred.html"

            console.log(allUsers);
        }
        
        ///estilos a la foto de perfil de usuario///////
        userPic.src = userList[i].profilePic;
        userPic.style.borderRadius = "25px";
        userPic.width = 50;
        userPic.height = 50;

        mobUserPic.src = userList[i].profilePic;
        mobUserPic.style.borderRadius = "25px";
        mobUserPic.width = 50;
        mobUserPic.height = 50;

        ///appendea los elementos//////
        userDiv.append(userPic);
        userDiv.append(userName);
        userDiv.append(friendButton);
        usersLI.append(userDiv);
        mobileUserDiv.append(mobUserPic);
        mobileUserDiv.append(mobUserName);
        mobileLI.append(mobileUserDiv);
        mobileList.append(mobileLI);
        usersUL.append(usersLI);
        users.append(usersUL);
    }
}
//funcion que muestra las sugerencias de amistad/////////////////   


function switchColor()
{ 
  darkMode = !darkMode; 
  localStorage.setItem('darkMode', JSON.stringify(darkMode));
  document.location = "mainred.html"
}

function detectTheme()
{
  let divheader = document.getElementById("divHeader");
  let userBar = document.getElementById("userbar");
  let friendDiv = document.getElementById("friendList"); 
  let newPostDiv = document.getElementById("agregadoFoto");
  let homeIcon = document.getElementById("homeIcon");
  let messageIcon = document.getElementById("messageIcon");
  let lightIcon = document.getElementById("lightIcon");
  let gearIcon = document.getElementById("gearIcon");
  let main = document.getElementById("main");  
  let modal = document.getElementById("modalPost");  
  let body = document.getElementById("body");  
  let mobileFriendList = document.getElementById("friendListMobile");  
  let mobileList = document.getElementById("mobileFriendList");  
  if(darkMode)
  {
    divheader.classList.toggle("navbar-dark");
    divheader.classList.toggle("bg-dark");
    userBar.classList.toggle("dark");
    friendDiv.classList.toggle("dark");
    avatarDiv.classList.toggle("dark");
    newPostDiv.classList.toggle("dark");
    messageIcon.classList.toggle("dark");
    homeIcon.classList.toggle("dark");
    lightIcon.classList.toggle("dark");
    gearIcon.classList.toggle("dark");
    main.classList.toggle("dark");
    modal.classList.toggle("bg-dark");
    body.classList.toggle("bg-dark");
    mobileFriendList.classList.toggle("dark");
    mobileList.classList.toggle("dropdown-menu-dark");
  }
}
