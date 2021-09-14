//Poblar parte usuario/////////////////////////////////////////////////////////////
let usuarioProfile
let usuarioLog
let allUsers = JSON.parse(localStorage.getItem('usuarios'));
let allPosts = [];
let noPost = document.createElement("p");



//verificar si hay posts en el Localstorage///////////////////////////////////////
if(localStorage.getItem("usuarioPost"))
{
    allPosts = JSON.parse(localStorage.getItem("usuarioPost"));
}
else
{
    console.log("no hay posts");
}
if(localStorage.getItem("usuarioProfile"))
{
   usuarioProfile = JSON.parse(localStorage.getItem("usuarioProfile"));
}
else
{
    document.location = "LogIn.html";
}
if(localStorage.getItem("usuarioLog"))
{
    usuarioLog = JSON.parse(localStorage.getItem("usuarioLog"));
}
else
{
    document.location = "LogIn.html";
}

let divPic = document.getElementById("profilePic");
let divName = document.getElementById("profileName");
let userName = document.createElement("h1");
let userPic = new Image;
let block = document.createElement("button");
let ban = document.createElement("button");
let adminDiv = document.getElementById("admin");

userName = usuarioProfile.name;

userPic.src = usuarioProfile.profilePic;
userPic.height = 100;
userPic.width = 100;
userPic.style.borderRadius = "100px";

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


if(usuarioLog.isAdmin && usuarioProfile.mail != "admin")
{
    adminDiv.append(ban, block)
}



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
         let postUser = document.createElement("h1");
         let postDate = document.createElement("h6");
         let postLikes = document.createElement("h6");
         let buttonLike = document.createElement("button");
         let postPic = new Image;
         let userPic = new Image;
         
         //inicializa los valores tomados de la lista de posts y el usuario al que corresponde el perfil////
         postText.innerText = userPosts[i].text;
         postPic.src = userPosts[i].mediaLink;
         postUser.innerText = userPosts[i].user.name;
         userPic.src = userPosts[i].user.profilePic;
         postLikes.innerText =  userPosts[i].likes.length + "Likes ";
         postDate.innerText = "Publicado el " + new Date(userPosts[i].date).toLocaleDateString();
         
         
         postText.style.backgroundColor = "whitesmoke";

         //da estilos al nombre del usuario/////////////////
         postUser.style.marginTop = "0px";

         //da estilos a la foto del usuario////////////////
         userPic.height = 50; 
         userPic.width = 50; 
         userPic.style.borderRadius = "100px";
         userPic.style.marginRight = "20px";
         userPic.style.marginTop = "0px";
                   
         //da estilos a la imagen de la publicacion////////////////////
         postPic.classList.toggle("card-img.top");
         postPic.style.height = "400px";
         postPic.style.width = "500px";
         postPic.style.marginTop = "0px";
         postPic.style.paddingBottom = "0px";
         postPic.style.paddingTop = "0px";
         
         //da estilos a la publicaion especifica///////////////////
         item.classList.toggle("card");
         item.style.width = 10;
         item.style.listStyle = "none";
         item.style.textAlign = "start"; 
         item.style.maxHeight = "fit-content";
         item.style.maxWidth = "fit-content";
         item.style.minHeight = "fit-content";
         item.style.minWidth = "fit-content";
         item.style.marginLeft = "400px";

         list.style.alignItems = "end";
         list.style.paddingLeft = "200px";        
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
         
         //carga todo lo anterior en userProfile.html///////////////////
         userdiv.append(userPic);
         userdiv.append(postUser);
         item.append(userdiv);
         item.append(postPic);
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
    let friend = usuarioProfile.friendsList;
    let allUsers = JSON.parse(localStorage.getItem('usuarios'));
    
    let friendlist = allUsers.filter(x => friend.includes(x.mail));
    
    console.log(friendlist);

    for(var i = 0; i < friendlist.length; i ++)
    {
        console.log(friendlist[i]);
        let friendListDiv = document.getElementById('friendList');
        let list = document.createElement("ul");
        let item = document.createElement("li");
        let friendName = document.createElement('a');
        let friendPic = new Image;
        
        let usuarioProf = friendlist[i];

        friendName.innerText = friendlist[i].name;
        friendName.style.textDecoration = "none";
        friendName.style.color = "black";
        friendName.style.paddingLeft = "20px";
        friendName.onclick = function()
        {
            localStorage.setItem('usuarioProfile', JSON.stringify(usuarioProf));

            document.location = "userProfile.html"
        }

        friendPic.src = friendlist[i].profilePic;
        friendPic.height = 50;
        friendPic.width = 50;
        friendPic.style.borderRadius = "25px";

        item.style.listStyle = "none";
        

        item.append(friendPic);
        item.append(friendName);
        list.append(item);
        friendListDiv.append(list);


    }


}

//poblar parte lista de amigos///////////////////////////////////////////////////////////
