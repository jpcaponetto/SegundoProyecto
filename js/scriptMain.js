
function envioFoto(){
    let imagen = document.getElementById('img').value;
    let img = new Image();
    img.src = imagen;
    let foto = document.getElementById('espacioFoto');
    espacioFoto.append(img );
    
    
}