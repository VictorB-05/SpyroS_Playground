
let juegos=["conecta4.html","pong.html","memory.html","oca.html"]

const boton=document.getElementById("juegoRandom");

boton.addEventListener('click', ()=>{
    let aleatorio=Math.floor(Math.random()*4);
    window.open(juegos[aleatorio]);
});