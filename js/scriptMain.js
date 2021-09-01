
let usuariosFotos = [];
let imagen = document.getElementById('img').value;

function envioFoto(){
    let imagen = document.getElementById('img').value;
    let img = new Image();
    img.src = imagen;
    let foto = document.getElementById('foto');
    let nuevoUl = document.createElement('ul');
    let nuevoLi = document.createElement('li');
    nuevoLi.append(img)
    nuevoUl.append(nuevoLi);
    foto.append(nuevoUl );

    usuariosFotos.push(imagen)

    let bd = localStorage.setItem('FotoUsuario',JSON.stringify(usuariosFotos))
    
    
}
let array = JSON.parse(localStorage.getItem('FotoUsuario'))
for(let i = 0; i < JSON.parse(localStorage.getItem('FotoUsuario')).length; i++){
    console.log(array[i]);
}


   
