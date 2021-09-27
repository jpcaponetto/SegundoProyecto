let user;

if(localStorage.getItem('usuarioLog'))
{
    user = JSON.parse(localStorage.getItem('usuarioLog'));
}

if(user != "undefined")
{
    document.location = "LogIn.html";
}
else
{
    document.location = "mainred.html";
}
