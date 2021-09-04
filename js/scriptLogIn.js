//Clases/////////////////////////////////////////////////////////////////////////
class User
{
    constructor(id, firstName, lastName, password, mail, birthDate, phone, friendsList, name, profilePic)
    {
        this.id = id;
        this.name = name;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.birthDate = birthDate;
        this.phone = phone;
        this.friendsList = friendsList;
        this.mail = mail;
        this.isActive = true;
        this.isAdmin = false;
        this.profilePic = profilePic;
       
    }
}

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
//clases/////////////////////////////////////////////////////////


// Inicializando variables necesarias para la creacion de ususarios////////////////////////////////
let defaultProfPic = new Image;
defaultProfPic.src = "https://www.sogapar.info/wp-content/uploads/2015/12/default-user-image.png";
let listaAmigos = [];
let usuarios = [];

if(localStorage.getItem('usuarios'))
{
    usuarios = JSON.parse(localStorage.getItem('usuarios'))
}
//Inicializando variables necesarias para la creacion de ususarios/////////////////////////////////

//Log In///////////////////////////////////////////////////////////////////////
function LogIn()
{
    //Tomar valores de los form
    usermail = document.getElementById("userMail").value;
    password = document.getElementById("password").value;
   
    //Encontrar coincidencias en el array de usuarios
    let currentUser = usuarios.find(usuario => usuario.mail == usermail && usuario.password == password);

    //Loguea o no segun el resultado anterior
    if(currentUser)
    {
        console.log("Login Succesfully");
        localStorage.setItem('usuarioLog', JSON.stringify(currentUser));
        document.location="mainred.html";
    }
    else
    {
        console.log("Error, wrong password or username");
        alert("Mail o Contraseña incorrectos!");
    }
}
//Log In///////////////////////////////////////////////////////////////////////

//Registro/////////////////////////////////////////////////////////////////////
function userRegister()
{
    //crea nuevo usuario a partir de 
    let userNew = new User;
    userNew.id = usuarios.length;
    userNew.firstName = document.getElementById("name").value;
    userNew.lastName = document.getElementById("lastname").value;
    userNew.password = document.getElementById("password").value;
    userNew.name = userNew.firstName + " " + userNew.lastName;
    userNew.mail = document.getElementById("mail").value;
    userNew.phone = document.getElementById("phone").value;
    userNew.birthDate = document.getElementById("birthdate").value;
    userNew.profilePic = defaultProfPic.src;
    userNew.friendsList = listaAmigos;
   
    //Valida y Guarda el usuario en LocalStorage
    if(userNew.firstName != "" && userNew.password != "" && !validateMail(userNew.mail))
    {
        usuarios.push(userNew);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        document.location = "LogIn.html"
        console.log("susses");
        console.log(usuarios);
    }
    else
    {
        if(userNew.firstName == "")
        {
            alert("Por favor, ingresar un nombre.");
        }
        if(userNew.lastName == "")
        {
            alert("Por favor, ingresar un apellido.");
        }
        if(userNew.firstPassword == "")
        {
            alert("Por favor, ingresar una contraseña.");
        }
        if(userNew.mail == "")
        {
            alert("Por favor, ingresar una direccion de Correo.");
        }
        if(userNew.phone == "")
        {
            alert("Por favor, ingresar un numero de telefono.");
        }
        if(userNew.firstName == "")
        {
            alert("Por favor, ingresar una fecha de nacimiento.");
        }
        if(validateMail(userNew.mail))
        {
            alert("Ya hay una cuenta registrada con esa direccion");
        }


        console.log("Error datos no validos");
        console.log(userNew.password);
    }
}

//validar Mail para que no puedan registrar mas de una cuenta con cada uno

function validateMail(mail)
{
    const valid = usuarios.find(usuario => usuario.mail == mail)

    
    return valid;
}

//cancela la creacion de un usuario y vuelve a la pantalla de logIn
function goLogIn()
{
    if(confirm("¿Regresar a la pagina de inicio?") )
    {
      document.location="LogIn.html";
    }
    else
    {
        document.location="register.html";
    }
}
//Registro de Usuario//////////////////////////////////////////////////////////////


//Dark theme(fuera de uso pero funciona)//////////////////////////////////////////////////

let logIn = document.getElementById("logIn");
let welcome = document.getElementById("welcome");
let logFourm = document.getElementById("logFourm");

function switchColor()
{
    document.body.classList.toggle("dark");

    logIn.classList.toggle("dark");
    welcome.classList.toggle("dark");
    logFourm.classList.toggle("dark");
}
//Dark theme//////////////////////////////////////////////////