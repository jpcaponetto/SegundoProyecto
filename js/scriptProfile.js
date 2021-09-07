//Poblar parte usuario/////////////////////////////////////////////////////////////
let usuarioProfile

if(localStorage.getItem("usuarioProfile"))
{
   usuarioProfile = JSON.parse(localStorage.getItem("usuarioProfile"));
}
else
{
    document.location = "LogIn.html";
}

let divPic = document.getElementById("profilePic");
let divName = document.getElementById("profileName");
let userName = document.createElement("h1");
let userPic = new Image;

userName = usuarioProfile.name;

userPic.src = usuarioProfile.profilePic;
userPic.height = 100;
userPic.width = 100;
userPic.style.borderRadius = "100px";


divPic.append(userPic);
divName.append(userName);
//Poblar parte usuario/////////////////////////////////////////////////////////////


//Poblar parte Publicaciones/////////////////////////////////////////////////////////////

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
         postPic.height = 400;
         postPic.width = 600;
         postPic.style.marginTop = "20px";
         postPic.style.paddingBottom = "10px";
         postPic.style.paddingTop = "10px";
         
         //da estilos a la publicaion especifica///////////////////
         item.classList.toggle("card");
         item.style.width = 10;
         item.style.listStyle = "none";
         item.style.textAlign = "start"; 
         item.style.borderTop = "solid 5px black"

         
         //da estilos al texto de la publicacion////////////////////
         postText.classList.toggle("card-text");
         postText.style.marginTop = "10px";
         postText.style.marginBottom = "20px";
         postText.style.padding = "20px"

         //da estilos al div que contiene foto y nombre del usuario//////////////////////////
         userdiv.classList.toggle("card-header")
         userdiv.style.display = "inline-flex";
         userdiv.style.textAlign = "center";
         userdiv.style.marginTop = "20px";

         postLikes.classList.toggle("card-list-item");
         postDate.classList.toggle("card-list-item");

         buttonLike.classList.toggle("btn");
         buttonLike.classList.toggle("btn-primary");
         buttonLike.value = "Like";
         buttonLike.innerText = "Like";
         
        let currentpost = userPosts[i];

     buttonLike.onclick = function() 
     {

        //likeDislike(userPosts[i]);

         let usuarioLog;

      if(localStorage.getItem('usuarioLog'))
      {
       usuarioLog = JSON.parse(localStorage.getItem('usuarioLog'));
      }
      else 
      {
       document.location = 'LogIn.html';
      }

    
        let validate = currentpost.likes.filter(like => like == usuarioLog.mail);

        console.log(validate);

        if(validate != usuarioLog.mail)
        {
         currentpost.likes.push(usuarioLog.mail);
         localStorage.setItem('usuarioPost',JSON.stringify(allPosts));
         document.location = "userProfile.html";
        }
        if(validate == usuarioLog.mail)
        {
         currentpost.likes.splice(validate);
         localStorage.setItem('usuarioPost',JSON.stringify(allPosts));
         document.location = "userProfile.html";

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






function likeDislike(thisPost)
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

    let currentpost = allPosts.find(post => post == thisPost);
    
    let validate = currentpost.likes.find(like => like == usuarioLog.mail);

    console.log(validate);

    if(!validate)
    {
        currentpost.likes.push(usuarioLog.mail);
        localStorage.setItem('usuarioPost',JSON.stringify(allPosts));
        //document.location = "userProfile.html";
    }
    if(validate == usuarioLog.mail)
    {
        currentpost.likes.splice(validate);
        localStorage.setItem('usuarioPost',JSON.stringify(allPosts));
        //document.location = "userProfile.html";

    }
}




//poblar parte lista de amigos///////////////////////////////////////////////////////////
//poblar parte lista de amigos///////////////////////////////////////////////////////////
