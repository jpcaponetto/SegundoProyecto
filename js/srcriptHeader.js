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