const col0=document.querySelectorAll('.col0');
const col1=document.querySelectorAll('.col1');
const col2=document.querySelectorAll('.col2');
const col3=document.querySelectorAll('.col3');
const col4=document.querySelectorAll('.col4');
const col5=document.querySelectorAll('.col5');
const col6=document.querySelectorAll('.col6');
const colArray=[col0,col1,col2,col3,col4,col5,col6];
let color1="rgb(162, 6, 235)";
let color2="rgb(6, 182, 235)";
let jugadorActual=color1;

let tablero = [];
for (let i = 0; i < 6; i++) {
    tablero[i] = [];                //inicia un tablero lleno de "null"
    for (let j = 0; j < 7; j++) {
        tablero[i][j] = null;
    }
}

//Funciones

// Esta funcion es llamada desde un listener de tipo click
function colocarFicha(columna) {
    //se recorre la columna donde se quiere colocar la ficha de forma inversa
    for (let i=5;i>=0;i--) {
        //comprueba si actualmente hay una ficha, si no la hay, será colocada
        if (columna[i].style.backgroundColor !== color2 && columna[i].style.backgroundColor !== color1) {
            columna[i].style.backgroundColor = jugadorActual;//fijamos el background del elemento con el color que tenga el jugador actual
            //actualizamos el tablero, será útil para realizar las comprobaciones.
            tablero[i][parseInt(columna[0].classList.value.slice(-1))] = (jugadorActual === color1)?1:2;
            siguienteTurno();//Alternamos entre colores 
            comprobarGanador(tablero);    
            return;
        }
    }
    
}

function siguienteTurno() {
    jugadorActual =jugadorActual === color1 ? color2 : color1; 
}

//Funcion de destacar Columna, recoge un array y un color

function destacarColumna(columna,color){
    if(color==="none"){
        columna.forEach(col => {
            console.log(col.style.boxShadow);
            if(col.style.boxShadow!=="green 0px 0px 15px"){
                col.style.boxShadow="none";
            }    
        });
        return; 
    }
    columna.forEach(col => {
        if(col.style.boxShadow!=="green 0px 0px 15px"){
            col.style.boxShadow="0 0 15px "+color; 
        }
      
    });
}

//Listeners

//Aplica un event listener a cada columna y usa una funcion para destacarlas

colArray.forEach((columnas)=>{
    columnas.forEach((col)=>{
        col.addEventListener('mouseover', ()=>{
            destacarColumna(columnas,"white");
        });
        col.addEventListener('mouseout', ()=>{
            destacarColumna(columnas,"none");
        });
        col.addEventListener('click', ()=>{
            colocarFicha(columnas);
        });
    });
});

//comprobaciones

//Código proporcionado por ChatGPT:

function comprobarGanador(tablero) {
    // Comprobar filas
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 4; j++) {
            if (tablero[i][j] !== null && 
                tablero[i][j] === tablero[i][j + 1] && 
                tablero[i][j] === tablero[i][j + 2] && 
                tablero[i][j] === tablero[i][j + 3]) {

                //asigna estilo al ganador

                let w1=document.querySelector(`#i${i}j${j}`);
                let w2=document.querySelector(`#i${i}j${j+1}`);
                let w3=document.querySelector(`#i${i}j${j+2}`);
                let w4=document.querySelector(`#i${i}j${j+3}`);                    
                destacarColumna([w1,w2,w3,w4],"green");
                
                    return tablero[i][j];
            }
        }
    }

    // Comprobar columnas
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 7; j++) {
            if (tablero[i][j] !== null && 
                tablero[i][j] === tablero[i + 1][j] && 
                tablero[i][j] === tablero[i + 2][j] && 
                tablero[i][j] === tablero[i + 3][j]) {
                return tablero[i][j];
            }
        }
    }

    // Comprobar diagonales hacia abajo y hacia la derecha
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 4; j++) {
            if (tablero[i][j] !== null && 
                tablero[i][j] === tablero[i + 1][j + 1] && 
                tablero[i][j] === tablero[i + 2][j + 2] && 
                tablero[i][j] === tablero[i + 3][j + 3]) {
                return tablero[i][j];
            }
        }
    }

    // Comprobar diagonales hacia arriba y hacia la derecha
    for (let i = 3; i < 6; i++) {
        for (let j = 0; j < 4; j++) {
            if (tablero[i][j] !== null && 
                tablero[i][j] === tablero[i - 1][j + 1] && 
                tablero[i][j] === tablero[i - 2][j + 2] && 
                tablero[i][j] === tablero[i - 3][j + 3]) {
                return tablero[i][j];
            }
        }
    }

    return null; // No hay ganador
}