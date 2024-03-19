console.log(window.location.href);
if(window.location.href.includes("home.html")){
    let juegos=["conecta4.html","pong.html","memory.html","oca.html"]

    const boton=document.getElementById("juegoRandom");
    
    boton.addEventListener('click', ()=>{
        let aleatorio=Math.floor(Math.random()*4);
        window.location.href=juegos[aleatorio];
    });
}
const banderas=document.querySelectorAll(".banderas");
banderas.forEach(element => {
    element.addEventListener('click',()=>{
        alert("Esta funcion no ha sido implementada todavía...");
    });
});