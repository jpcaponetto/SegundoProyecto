let user;

if(localStorage.getItem('currentUser'))
{
    user = JSON.parse(localStorage.getItem('currentUser'));
}

if(user != "undefined")
{
    document.location = "LogIn.html";
}
else
{
    document.location = "mainred.html";
}