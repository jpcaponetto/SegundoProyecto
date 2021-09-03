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

divPic.append(userPic);
divName.append(userName);
//Poblar parte usuario/////////////////////////////////////////////////////////////


//Poblar parte Publicaciones/////////////////////////////////////////////////////////////

let allPosts = [];
let noPost = document.createElement("p");



if(localStorage.getItem("usuarioPost"))
{
    allPosts = JSON.parse(localStorage.getItem("usuarioPost"));
}
else
{
    console.log("no hay posts");
}

let userPosts = allPosts.filter(post => post.user.id == usuarioProfile.id);


if(userPosts.length !== 0)
{
    console.log(usuarioProfile);
    console.log(userPosts);

    for(var i = 0; i < userPosts.length; i++)
    {
        let postList = document.getElementById("postList");

         let list = document.createElement("ul");
         let item = document.createElement("li");
         let postText = document.createElement("p");
         let postPic = new Image;
         
         
         postText = userPosts[i].text;
         postPic.src = userPosts[i].mediaLink;
         postPic.height = 500;
         postPic.width = 500;

         item.append(postPic);
         item.append(postText);
         list.append(item);
         postList.append(list);
    }
}
else
{
    noPost = usuarioProfile.name + " no realizo publicaiones todavia";
    postList.append(noPost);
    console.log(userPosts.length);
}
//Poblar parte Publicaciones/////////////////////////////////////////////////////////////
