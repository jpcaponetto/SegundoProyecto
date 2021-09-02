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

let defaultProfPic = new Image;
defaultProfPic.src = "https://www.sogapar.info/wp-content/uploads/2015/12/default-user-image.png";
let listaAmigos = [];
// LogIn
let usuarios = [];

if(localStorage.getItem('usuarios'))
{
    usuarios = JSON.parse(localStorage.getItem('usuarios'))
}

function LogIn()
{
    
    usermail = document.getElementById("userMail").value;
    password = document.getElementById("password").value;
   
    let currentUser = usuarios.find(usuario => usuario.mail == usermail && usuario.password == password);

    if(currentUser)
    {
        console.log("Login Succesfully");
        localStorage.setItem('usuarioLog', JSON.stringify(currentUser));
        document.location="mainred.html";
        console.log(currentUser);
    }
    else
    {
        console.log("Error, wrong password or username");
        alert
    }


}

function userRegister()
{
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
   
   
    if(userNew.firstName != "" && userNew.password != "" && !validateMail(userNew.mail))
    {
        usuarios.push(userNew);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        console.log("susses");
        console.log(usuarios);
    }
    else
    {
        if(userNew.firstName == "")
        {
            alert("Por favor, ingresar un nombre.")
        }
        if(userNew.lastName == "")
        {
            alert("Por favor, ingresar un apellido.")
        }
        if(userNew.firstPassword == "")
        {
            alert("Por favor, ingresar una contraseña.")
        }
        if(userNew.mail == "")
        {
            alert("Por favor, ingresar una direccion de Correo.")
        }
        if(userNew.phone == "")
        {
            alert("Por favor, ingresar un numero de telefono.")
        }
        if(userNew.firstName == "")
        {
            alert("Por favor, ingresar una fecha de nacimiento.")
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

//Login
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



//Dark theme

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
