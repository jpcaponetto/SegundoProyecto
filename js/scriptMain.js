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

let usuariosPost = [];

let usuarioLog = JSON.parse(localStorage.getItem('usuarioLog'));



if(localStorage.getItem('usuariosPosts'))
{
    usuariosPost = JSON.parse(localStorage.getItem('usuariosPosts'));
}


//let imagen = document.getElementById('img').value;

function makePost(){
    let newPost = new Post;

    newPost.id = usuariosPost.length;
    newPost.date = Date.now;
    newPost.mediaLink = document.getElementById('imgPost').value;
    newPost.text = document.getElementById('textPost').value;
    newPost.likes = 0;
    newPost.user = usuarioLog;

    //let imagen = document.getElementById('img').value;
   // let img = new Image();
   // img.src = newPost.mediaLink;
   // let userName = usuarioLog.userName;
   // let foto = document.getElementById('foto');
   // document.write('textPost');
   // let nuevoUl = document.createElement('ul');
   // let nuevoLi = document.createElement('li');
   // 
   // 
   // nuevoLi.append(img);
   // nuevoUl.append(nuevoLi);
   // foto.append(nuevoUl);
   // userName.append()
   // usuariosFotos.push(imagen)
   
   if(newPost.text != null && newPost.mediaLink != null)
   {
       usuariosPost.push(newPost);
       localStorage.setItem('usuarioPost',JSON.stringify(usuariosPost));
       console.log(usuariosPost);
   }
   else
   {
       console.log("error");
   }
}

function postsList()
{
    let lista = document.createElement('div');
    let postsArea = document.createElement('ul');
    let posts = document.createElement('li');
    let postContent = document.createElement('div');
    let postMedia = new Image();
    let postText = document.createElement('p');
     

    lista.append(postsArea);
    
    for(var i = 0; i < usuariosPost.length; i++)
    {
        postText.value = usuariosPost[i].text;
        postMedia.src = usuariosPost[i].mediaLink;
        postsArea.append(posts);
        posts.append(postContent);
        postContent.append(postText);
        console.log(usuariosPost[i]);
        document.write(usuariosPost[i]);
    }
}
    

   
