let currentUser;
let allUsers = [];

if(localStorage.getItem('usuarios'))
{
    allUsers = JSON.parse(localStorage.getItem('usuarios'));
}


if(localStorage.getItem('usuarioLog'))
{
    currentUser = JSON.parse(localStorage.getItem('usuarioLog'));
}
else
{
    document.location('LogIn.html');
}

function logOut()
{
    if(confirm("¿Cerrar Sesion?"))
    {
       currentUser = undefined;
       localStorage.setItem('usuarioLog', JSON.stringify(currentUser));
       document.location = 'LogIn.html';
    }
}

function goProfile()
{
    localStorage.setItem('usuarioProfile', JSON.stringify(currentUser));
    document.location ='userProfile.html';
}

function editProfile()
{
    let newName = document.getElementById('newName').value;
    let newPic = document.getElementById('newPic').value;
    
    if(newName != "")
    {
      currentUser.name = newName;
    }
    if(newPic != "")
    {
      currentUser.profilePic = newPic;
    }
    
    allUsers.splice(currentUser.id - 1, 1, currentUser);
    localStorage.setItem('usuarios', JSON.stringify(allUsers));
    localStorage.setItem('usuarioProfile', JSON.stringify(currentUser));
    document.location ='userProfile.html';
}

function search()
{
    let searchbar = document.getElementById("searchbar").value;
    searchbar = searchbar.toLowerCase();
    let searchList = allUsers.filter(user => user.name.includes(searchbar));
    console.log(searchList);
    let list = document.getElementById("searchList");
    list.innerHTML = "";
    for(var i = 0; i < searchList.length; i++)
    {
        let item = document.createElement("li");
        let userPic = new Image;
        let userName = document.createElement("a");

        userPic.src = searchList[i].profilePic;
        userPic.width = 50;
        userPic.height = 50;
        userPic.style.borderRadius = "100px";

        var user = searchList[i];
        userName.innerText = searchList[i].name;
        userName.style.textDecoration = "none";
        userName.style.color = "black";
        userName.onclick = function()
        {
            localStorage.setItem('usuarioProfile', JSON.stringify(user));
            document.location = "userProfile.html";
        }
        item.append(userPic);
        item.append(userName);
        list.append(item);
        
    }
}
   

    
