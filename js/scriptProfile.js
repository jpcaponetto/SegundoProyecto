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

//Poblar parte usuario/////////////////////////////////////////////////////////////
let usuarioProfile
let usuarioLog
let allUsers = JSON.parse(localStorage.getItem('usuarios'));
let allPosts = [];
let noPost = document.createElement("p");
let newPostButton = document.getElementById('newPost');
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

//verificar si hay posts en el Localstorage///////////////////////////////////////
if(localStorage.getItem("usuarioPost"))
{
    allPosts = JSON.parse(localStorage.getItem("usuarioPost"));
}
else
{
    console.log("no hay posts");
}
//verifica si existe el usuario el perfil/////
if(localStorage.getItem("usuarioProfile"))
{
   usuarioProfile = JSON.parse(localStorage.getItem("usuarioProfile"));
}
else
{
    document.location = "LogIn.html";
}
//verifica si hay un usuario logueado////////
if(localStorage.getItem("usuarioLog"))
{
    usuarioLog = JSON.parse(localStorage.getItem("usuarioLog"));
}
else
{
    document.location = "LogIn.html";
}

if(usuarioProfile.id != usuarioLog.id)
{
    newPostButton.style.visibility = "hidden";
}

window.onload = detectTheme();

///crea los elementos necesarios para el encabezado del perfil//////
let divPic = document.getElementById("profilePic");
let divName = document.getElementById("profileName");
let userName = document.createElement("h1");
let userPic = new Image;
let block = document.createElement("button");
let ban = document.createElement("button");
let adminDiv = document.getElementById("admin");

//da los valores a los elementos
userName = usuarioProfile.name;

userPic.src = usuarioProfile.profilePic;
//estilos en la foto de perfil
userPic.height = 100;
userPic.width = 100;
userPic.style.borderRadius = "100px";

//boton de bloquear perfil
block.classList.toggle("btn");
block.classList.toggle("btn-warning");
if(usuarioProfile.isActive == false)
{
  block.innerText = "Desbloquear"
}
if(usuarioProfile.isActive == true)
{
  block.innerText = "Bloquear";
}
block.onclick = function()
{
    if(!usuarioProfile.isActive)
    {
        usuarioProfile.isActive = true;
        allUsers.splice(usuarioProfile.id, 1, usuarioProfile);
        localStorage.setItem('usuarios', JSON.stringify(allUsers));
        localStorage.setItem('usuarioProfile', JSON.stringify(usuarioProfile));
        document.location = "userProfile.html";
    }
    else
    {
        usuarioProfile.isActive = false;
        allUsers.splice(usuarioProfile.id, 1, usuarioProfile);
        localStorage.setItem('usuarios', JSON.stringify(allUsers));
        localStorage.setItem('usuarioProfile', JSON.stringify(usuarioProfile));
        document.location = "userProfile.html";
    }
}

//boton de borrar perfil
ban.classList.toggle("btn");
ban.classList.toggle("btn-danger");
ban.innerText = "Borrar";
ban.onclick = function()
{
    if(confirm("Este usuario sera suspendido permanenetemente ¿Desea continuar?"))
    {
        allPosts = JSON.parse(localStorage.getItem("usuarioPost"));
        allUsers.splice(usuarioProfile.id, 1);
        localStorage.setItem('usuarios', JSON.stringify(allUsers));
        console.log(allPosts);
        for(var i = 0; i < allPosts.length; i++)
        {
            let currentpost = allPosts[i];
            if(currentpost.likes.includes(usuarioProfile.mail))
            {
                currentpost.likes.splice(currentpost.likes.findIndex(x => x === usuarioProfile.mail), 1);
                localStorage.setItem('usuarioPost',JSON.stringify(allPosts));
                console.log(currentpost.likes);
            }
        }
        document.location = "mainred.html";
    }
}
//si el usuario es administrador appendea los botones de bloqueo y borrado
if(usuarioLog.isAdmin && usuarioProfile.mail != "admin")
{
    adminDiv.append(ban, block)
}

//appendea foto y nombre del usuario
divPic.append(userPic);
divName.append(userName);
//Poblar parte usuario/////////////////////////////////////////////////////////////

//filtra los post que son del usuario y los guarda en un array//////////////////////////
let userPosts = allPosts.filter(post => post.user.id == usuarioProfile.id);

//revierte el array para mostrar las publicaciones nuevas pirmero////////////////////////
userPosts = userPosts.reverse();

//evalua si hay posts que corresponden al usuario del perfil////////////////////
//si encuentra////////////////////////////////////////////////
if(userPosts.length !== 0)
{
    console.log(usuarioProfile);
    console.log(userPosts);
    
    //pasa por todos los posts que correspondan al usuario////////////////////////////
    for(var i = 0; i < userPosts.length; i++)
    {
        //crea y toma los elementos de html para realizar la publicacion///////////////////////////////
         let postList = document.getElementById("postList");

         let userdiv = document.createElement("div");
         let list = document.createElement("ul");
         let item = document.createElement("li");
         let postText = document.createElement("p");
         let postUser = document.createElement("p");
         let postDate = document.createElement("h6");
         let postLikes = document.createElement("h6");
         let buttonLike = document.createElement("button");
         let postPic = new Image;
         let userPic = new Image;
         let buttonAdmin = document.createElement("button");

         //inicializa los valores tomados de la lista de posts y el usuario al que corresponde el perfil////
         postText.innerText = userPosts[i].text;
         if(userPosts[i].mediaLink != "")
         {
            postPic.src = userPosts[i].mediaLink;
         }
         postUser.innerText = userPosts[i].user.name;
         userPic.src = userPosts[i].user.profilePic;
         postLikes.innerText =  userPosts[i].likes.length + "Likes ";
         postDate.innerText = "Publicado el " + new Date(userPosts[i].date).toLocaleDateString();
         
         postText.style.backgroundColor = "whitesmoke";
          
         if(usuarioLog.isAdmin || usuarioLog.id == usuarioProfile.id)
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
                 document.location = "userProfile.html";
             }
 
         }
         //da estilos al nombre del usuario/////////////////
         postUser.style.marginTop = "10px";
         postUser.style.fontWeight = "800";
         //da estilos a la foto del usuario////////////////
         userPic.height = 50; 
         userPic.width = 50; 
         userPic.style.borderRadius = "100px";
         userPic.style.marginRight = "20px";
         userPic.style.marginTop = "0px";
                   
         //da estilos a la imagen de la publicacion////////////////////
         postPic.classList.toggle("card-img.top");
         postPic.style.maxWidth = "800px";
        
         
         //da estilos a la publicaion especifica///////////////////
         item.classList.toggle("card");
         item.style.width = 10;
         item.style.listStyle = "none";
         item.style.textAlign = "start"; 
         item.style.maxWidth = "600px";
         item.style.minWidth = "600px";
         

         list.style.minHeight = "1100px";
         list.style.paddingTop = "100px";
         //da estilos al texto de la publicacion////////////////////
         postText.classList.toggle("card-text");
         postText.style.marginTop = "10px";
         postText.style.marginBottom = "20px";
         postText.style.padding = "20px"

         //da estilos al div que contiene foto y nombre del usuario//////////////////////////
         userdiv.classList.toggle("card-header")
         userdiv.style.display = "inline-flex";
         userdiv.style.textAlign = "center";
         userdiv.style.marginTop = "0px";
         
         //da estilos a la fecha y los likes//////////////////////////
         postLikes.classList.toggle("card-list-item");
         postDate.classList.toggle("card-list-item");
         

         //da estilos al boton de like//////////////////////////
         buttonLike.classList.toggle("btn");
         buttonLike.classList.toggle("btn-primary");
         buttonLike.value = "Like";
         buttonLike.innerText = "Like";
         
         let currentpost = userPosts[i];
         //funcion de dar like//////////////////////////////////
         buttonLike.onclick = function() {
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
       
               if(!validate)
               {
                 currentpost.likes.push(usuarioLog.mail);
                 localStorage.setItem('usuarioPost',JSON.stringify(allPosts));
                  document.location = "userProfile.html";
                  console.log(currentpost.likes);
               }
               if(validate)
               {
                 currentpost.likes.splice(currentpost.likes.findIndex(x => x === usuarioLog.mail), 1);
                 localStorage.setItem('usuarioPost',JSON.stringify(allPosts));
                 document.location = "userProfile.html";
                 console.log(currentpost.likes);
               }
           }
           if(darkMode)
           {
              item.classList.toggle("text-white");
              item.classList.toggle("bg-dark");
              postText.style.backgroundColor = "black";
           }
         //carga todo lo anterior en userProfile.html///////////////////
         userdiv.append(userPic);
         userdiv.append(postUser);
         if(usuarioLog.isAdmin || usuarioLog.id == usuarioProfile.id)
         {
            userdiv.append(buttonAdmin);
         }
         item.append(userdiv);
         if(postPic.src != "")
         {
           item.append(postPic);
         }
         item.append(postText);
         item.append(postLikes);
         item.append(postDate);
         item.append(buttonLike);
         list.append(item);
         postList.append(list);
    }
}
//si no encuentra//////////////////////////////////////////////////
else
{
    noPost = usuarioProfile.name + " no realizo publicaiones todavia";
    postList.append(noPost);
    console.log(userPosts.length);
}
//Poblar parte Publicaciones/////////////////////////////////////////////////////////////


//poblar parte lista de amigos///////////////////////////////////////////////////////////
if(usuarioProfile.friendsList.length > -1)
{
    ///lista de amigos del usuario(array de mails) y lista de usuarios///////
    let friend = usuarioProfile.friendsList;
    let allUsers = JSON.parse(localStorage.getItem('usuarios'));
    ///lista de usuarios que son amigos/////    
    let friendlist = allUsers.filter(x => friend.includes(x.mail));
    
    ///recorre el resultante del filtro anterior////////
    for(var i = 0; i < friendlist.length; i ++)
    {
        //crea los elementos necesarios para cada item/////
        let friendListDiv = document.getElementById('friendList');
        let mobileList = document.getElementById("mobileFriendList");
        let list = document.createElement("ul");
        let item = document.createElement("li");
        let mobileLI = document.createElement('li');
        let friendName = document.createElement('a');
        let mobUserName = document.createElement('a');
        let friendPic = new Image;
        let mobUserPic = new Image;
        let usuarioProf = friendlist[i];
        
        //da estilo y asigna valor al nombre del usuario/////
        friendName.innerText = friendlist[i].name;
        friendName.style.textDecoration = "none";
        friendName.style.color = "black";
        if(darkMode)
        {
          friendName.style.color = "white";

        }
        friendName.style.paddingLeft = "20px";
        //funcion para ir al prefil de otro usuario tocando su nombre////
        friendName.onclick = function()
        {
            localStorage.setItem('usuarioProfile', JSON.stringify(usuarioProf));

            document.location = "userProfile.html"
        }

        mobUserName.innerText = friendlist[i].name;
        mobUserName.style.textDecoration = "none";
        mobUserName.style.color = "black";
        if(darkMode)
        {
            mobUserName.style.color = "white";
        }

        mobUserName.onclick = function()
        {
            localStorage.setItem('usuarioProfile', JSON.stringify(usuarioProf));

            document.location = "userProfile.html"
        }

        //valor y estilo a la foto de perfil de usuario////
        friendPic.src = friendlist[i].profilePic;
        friendPic.height = 50;
        friendPic.width = 50;
        friendPic.style.borderRadius = "25px";

        mobUserPic.src = friendlist[i].profilePic;
        mobUserPic.style.borderRadius = "25px";
        mobUserPic.width = 50;
        mobUserPic.height = 50;
        
        //estilo en item de la lista
        item.style.listStyle = "none";
        
        //appendea los elemntos 
        item.append(friendPic);
        item.append(friendName);
        list.append(item);
        mobileLI.append(mobUserPic);
        mobileLI.append(mobUserName);
        mobileList.append(mobileLI);
        friendListDiv.append(list);
    }
}
//poblar parte lista de amigos///////////////////////////////////////////////////////////

function switchColor()
{ 
  darkMode = !darkMode; 
  localStorage.setItem('darkMode', JSON.stringify(darkMode));
  document.location = "userProfile.html"
}

function detectTheme()
{
  let divheader = document.getElementById("divHeader");
  let friendDiv = document.getElementById("friendList"); 
  let newPostDiv = document.getElementById("agregadoFoto");
  let profilePic = document.getElementById("profilePic");
  let profileName = document.getElementById("profileName");
  let userCont = document.getElementById("userCont");
  let rowCont = document.getElementById("rowCont");
  let homeIcon = document.getElementById("homeIcon");
  let messageIcon = document.getElementById("messageIcon");
  let lightIcon = document.getElementById("lightIcon");
  let gearIcon = document.getElementById("gearIcon");
  let main = document.getElementById("main");  
  let modal = document.getElementById("modalPost"); 
  let mobileList = document.getElementById("mobileFriendList");   
  if(darkMode)
  {
    divheader.classList.toggle("navbar-dark");
    divheader.classList.toggle("bg-dark");
    friendDiv.classList.toggle("dark");
    newPostDiv.classList.toggle("dark");
    messageIcon.classList.toggle("dark");
    homeIcon.classList.toggle("dark");
    lightIcon.classList.toggle("dark");
    gearIcon.classList.toggle("dark");
    profilePic.classList.toggle("dark");
    profileName.classList.toggle("dark");
    userCont.classList.toggle("dark");
    rowCont.classList.toggle("dark");
    main.classList.toggle("dark");
    modal.classList.toggle("bg-dark");
    mobileList.classList.toggle("dropdown-menu-dark");
  }
}

function makePost()
{
      /// crea un nuevo "Post"/////////////////////
      let newPost = new Post;

      ///da los valores al nuevo Post///////////////////////
      newPost.id = allPosts.length;
      newPost.date = Date();
      newPost.mediaLink = document.getElementById('imgPost').value;
      newPost.text = document.getElementById('textPost').value;
      newPost.likes = [];
      newPost.user = usuarioLog;
     
      ///valida si el form de texto no esta vacio///////
     if(newPost.text != "")
     {
         ///pushea el nuevo post en el array de posts////
         allPosts.push(newPost);
         ///pushea el array en localstorage/////
         localStorage.setItem('usuarioPost',JSON.stringify(allPosts));
         ///recarga la pagina para que se muestre el nuevo post/////
         window.location.href ="userProfile.html";
     }
     else
     {
         ///alerta si el form de texto esta vacio////////////
         alert("¡Atencion! El post debe contener texto.")
     }
}