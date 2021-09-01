class User
{
    constructor(id, firstName, lastName, password, mail, birthDate, phone, adress, friendsList)
    {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.birthDate = birthDate;
        this.phone = phone;
        this.adress = adress;
        this.friendsList = friendsList;
        this.mail = mail;
        this.isActive = true;
        this.isAdmin = false;
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
    correctLogIn = false;
    username = document.getElementById("userName");
    password = document.getElementById("password");
    console.log(usuarios);
    let currentUser;

    for(let i = 0; i < usuarios.length; i++)
    {
        console.log(usuarios[i].userName);
        currentUser = usuarios[i];
       
        if(currentUser.userName == username.value && currentUser.password == password.value)
        {
            correctLogIn = true;
        }
        else
        {
            correctLogIn = false;
        }
    }

    if(correctLogIn == true)
    {
        console.log("Login Sussesfully");
    }
    else
    {
        console.log("Error, wrong password or username");
        console.log(usuarios.toString());
    }
}

function userRegister()
{
    let username = prompt("Ingresar Nombre de Usuario", "Nombre");
    let password = prompt("Ingresar Contraseña", "contraseña");
    let mail = prompt("Ingresar Correo Electronico", "example@gmail.com");    

    let userNew = new User;
    userNew.userName = username;
    userNew.password = password;
    userNew.mail =mail;
    if(userNew.userName != null && userNew.password != null && userNew.mail != null)
    {
        usuarios.push(userNew);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        console.log("susses");
        console.log(usuarios);
    }
    else
    {
        console.log("Error");
    }
}
//Login

//Dark theme
function switchColor()
{
    document.body.classList.toggle("dark");
}
