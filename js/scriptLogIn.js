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
    }
    else
    {
        console.log("Error, wrong password or username");
        console.log(currentUser);
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
   
   
    if(userNew.firstName != null && userNew.password != "" && !validateMail(userNew.mail))
    {
        usuarios.push(userNew);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        console.log("susses");
        console.log(usuarios);
    }
    else
    {
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

//Dark theme
function switchColor()
{
    document.body.classList.toggle("dark");
}

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
