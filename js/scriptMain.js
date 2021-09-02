/* Subida de foto */

let usuariosFotos = [];
let imagen = document.getElementById('img').value;
let user = localStorage.getItem('usuarios')
let username = JSON.parse(user)
console.log(username[0]['name'])

function envioFoto(){
    let imagen = document.getElementById('img').value;
    let img = new Image();
    img.src = imagen;
    let foto = document.getElementById('contenedorImg');
    let usuario = document.createElement('p');
    let div = document.createElement('div');
    usuario.innerHTML = username[0]['name'];
    div.append(usuario);
    div.append(img)
    foto.append(div)
    
    div.className = 'foto'

    usuariosFotos.push(imagen)

    let bd = localStorage.setItem('FotoUsuario',JSON.stringify(usuariosFotos))
    
    
}

/*Consol Log de Links */
let array = JSON.parse(localStorage.getItem('FotoUsuario'))

for(let i = 0; i < JSON.parse(localStorage.getItem('FotoUsuario')).length; i++){
    console.log(array[i]);
}

let refresh = confirm('Desea continuar?');

if(refresh == false){
    alert('Hasta luego!')
}else if(refresh == true){
    for(let j = 0; j < JSON.parse(localStorage.getItem('FotoUsuario')).length; j++){
        let nuevoUl = document.createElement('ul');
        let nuevoLi = document.createElement('li');
        img = new Image();
        img.src = array[j];
        nuevoLi.append(img);
        nuevoUl.append(nuevoLi);
        foto.append(nuevoUl );
        
    }
}

   
