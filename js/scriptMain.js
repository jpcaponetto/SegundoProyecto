
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

   
