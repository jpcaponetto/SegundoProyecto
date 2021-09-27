//variables para usuario actual y lista de usuarios///
let currentUser;

//verifica si hay un usuario logueado/////
if(localStorage.getItem('usuarioLog'))
{
    currentUser = JSON.parse(localStorage.getItem('usuarioLog'));
}
//si no hay un usuario envia al logIn///
else
{
    document.location = 'LogIn.html';
}
//funcion para cerrar sesion///
function logOut()
{
    //si el confirm recive positivo
    if(confirm("¿Cerrar Sesion?"))
    {
       //establece que el usuario actual esta indefinido//
       currentUser = undefined;
       //guarda el usuario actual(indefinido) en localstorage
       localStorage.setItem('usuarioLog', JSON.stringify(currentUser));
       //envia a la pagina del log in///
       document.location = 'LogIn.html';
    }
}

//funcion para ir al perfil del usuario logueado////
function goProfile()
{
    localStorage.setItem('usuarioProfile', JSON.stringify(currentUser));
    document.location ='userProfile.html';
}

///funcion de editar perfil////
function editProfile()
{
    let allUsers = JSON.parse(localStorage.getItem('usuarios'));

    //asigna los valores de los forms en variables 
    let newName = document.getElementById('newName').value;
    let newPic = document.getElementById('newPic').value;
    
    //verifica si los valores no son nulos y los asigna
    if(newName != "")
    {
      currentUser.name = newName;
    }
    if(newPic != "")
    {
      currentUser.profilePic = newPic;
    }
    
    //reemplaza al usuario en el array
    allUsers.splice(currentUser.id - 1, 1, currentUser);
    //guarda el array en localstorage
    localStorage.setItem('usuarios', JSON.stringify(allUsers));
    localStorage.setItem('usuarioProfile', JSON.stringify(currentUser));
    //recarga la pagina
    document.location ='userProfile.html';
}

//funcion de la barra de busqueda/////
function search()
{
    let allUsers;
    //verifica si hay usuarios para llenar la lista/////
if(localStorage.getItem('usuarios'))
{
    allUsers = JSON.parse(localStorage.getItem('usuarios'));
} 

    //asigna el valor de lo escrito en el form buscar en una variable
    let searchbar = document.getElementById("searchbar").value;
    searchbar = searchbar.toLowerCase();
    //filtra los usuarios que contengan en sus nombres lo escrito en el form de busqueda
    let searchList = allUsers.filter(user => user.name.includes(searchbar));
    let list = document.getElementById("searchList");
    list.innerHTML = "";
    for(var i = 0; i < searchList.length; i++)
    {
        //elementos que van en la lista 
        let item = document.createElement("li");
        let userPic = new Image;
        let userName = document.createElement("a");

        //valor y estilos en la foto de perfil
        userPic.src = searchList[i].profilePic;
        userPic.width = 50;
        userPic.height = 50;
        userPic.style.borderRadius = "100px";

        var user = searchList[i];
        //valor  y estilos en el nombre del usuario
        userName.innerText = searchList[i].name;
        userName.style.textDecoration = "none";
        userName.style.color = "black";
        //funcion que lleva al perfil del usuario
        userName.onclick = function()
        {
            localStorage.setItem('usuarioProfile', JSON.stringify(user));
            document.location = "userProfile.html";
        }
        //appendea los elementos en la lista
        item.append(userPic);
        item.append(userName);
        list.append(item);
    }
}
   
function goMain()
{
    document.location = "mainred.html";
}
    
