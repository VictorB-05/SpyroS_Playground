//llamada a las columnas
const col0=document.querySelectorAll('.col0');
const col1=document.querySelectorAll('.col1');
const col2=document.querySelectorAll('.col2');
const col3=document.querySelectorAll('.col3');
const col4=document.querySelectorAll('.col4');
const col5=document.querySelectorAll('.col5');
const col6=document.querySelectorAll('.col6');
//array de columnas
const colArray=[col0,col1,col2,col3,col4,col5,col6];
//botones
const daltonicos=document.querySelector('#daltonicos');
const turno=document.querySelector('#turno');
const idReiniciarPartida=document.querySelector('#reiniciarPartida');
const score=document.querySelector('#score');
const idReiniciarScore=document.querySelector('#reiniciarScore');
const idGanador=document.querySelector('#ganador');
//fijar colores
const color1="rgb(162, 6, 235)";
const color2="rgb(6, 182, 235)";
const estiloPorDefecto=document.querySelector('#i0j0').style;
let jugadorActual=color1;
//boolean
let Bdaltonicos=false;
//score
let j1=0;
let j2=0;
//declaracion timeout a nivel global
let timeout;
//declaracion e inicializacion de arrays
let tablero=[];
let idArray=[];

for (let i = 0; i < 6; i++) {
    tablero[i]=[];                
    idArray[i]=[];
    for (let j = 0; j < 7; j++) {
        tablero[i][j]=null; //inicia un array bidimensional tablero lleno de "null"
        idArray[i][j]=document.querySelector(`#i${i}j${j}`); //almacenamos el array de id (lo que se va a ver en la pagina)
    }
}
/*
    A implementar:
        -Empate
        -revisar apartado grafico
        -cambiar de ficha entre partidas
        -Instrucciones??
    
*/
//Funciones

// Esta funcion es llamada desde un listener(click)
function colocarFicha(columna) {
    //se recorre la columna donde se quiere colocar la ficha de forma inversa
    for (let i=5;i>=0;i--) {
        //comprueba si actualmente hay una ficha, si no la hay, será colocada
        if (columna[i].style.backgroundColor !== color2 && columna[i].style.backgroundColor !== color1) {
            //fijamos el background del elemento con el color que tenga el jugador actual
            columna[i].style.backgroundColor = jugadorActual;
            //obtenemos la columna j del tablero a través del ultimo numero del nombre de su clase, ejemplo: ".col4".slice(-1)==="4"
            //luego asigno a la posicion indicada un número, a través de esto, haré las comprobaciones.
            tablero[i][parseInt(columna[0].classList.value.slice(-1))] = (jugadorActual === color1)?1:2;
            modoDaltonicos();
            if(comprobarGanador(tablero)){
                puntuar(jugadorActual);
                timeout=setTimeout(()=>{
                    reiniciarPartida();
                },5000);
                return;
            }  
            siguienteTurno();//Alternamos entre colores   
            return;
        }
    }
    
}

function siguienteTurno() {
    jugadorActual=jugadorActual==color1?color2:color1;
    if(Bdaltonicos){
        turno.innerHTML=`Turno: ${jugadorActual==color1?"Dragones":"Coronas"}`;
    }else{
        turno.innerHTML=`Turno: ${jugadorActual==color1?"Moradas":"Azules"}`;
    }
}

function puntuar(jugador){
    jugador === color1?j1++:j2++;
    if(Bdaltonicos){
        idGanador.innerHTML=`Ganan ${jugadorActual==color1?"Dragones":"Coronas"}`;
    }else{
        idGanador.innerHTML=`Ganan ${jugadorActual==color1?"Moradas":"Azules"}`;
    }
    idGanador.style.boxShadow=`inset ${jugadorActual} 0px 0px 10px, ${jugadorActual} 0px 0px 10px`; 
    idGanador.style.color=jugadorActual;
    score.innerHTML=`Score: ${j1}-${j2}`
    
}
function reiniciarScore(){
    j1=0;
    j2=0;
    score.innerHTML=`Score: ${j1}-${j2}`
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

function reiniciarPartida(){
    clearTimeout(timeout);
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 7; j++) {
            tablero[i][j] = null; //inicia un array bidimensional tablero lleno de "null"
            idArray[i][j].innerHTML="";
            idArray[i][j].style=estiloPorDefecto; //almacenamos el array de id (lo que se va a ver en la pagina)
            idGanador.innerHTML="";
            idGanador.style.boxShadow="none";
        }
    }
    jugadorActual=color1;
    modoDaltonicos();
}
//esta funcion activa o desactiva el modo daltonicos dependiendo de la variable booleana  "Bdaltonicos".
//se me ocurre un enfoque más eficiente, podría agregar la propiedad "visibility:hidden" y alterarla con js,
//de esta forma no sería necesario la utilizacion del bucle, pero la implementada es la primera forma que se me vino a la cabeza...
function modoDaltonicos(){
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 7; j++) {
            if(Bdaltonicos){
                if(idArray[i][j].style.backgroundColor==color1){
                    idArray[i][j].innerHTML='<svg height="200px" width="200px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-21.17 -21.17 84.68 84.68" xml:space="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path style="fill:#030104;" d="M31.002,22.26c0.338,0.111,0.115-0.545-0.498-1.465l-0.371-0.559 c-0.612-0.919-0.871-1.638-0.579-1.606c0.293,0.032-0.009-0.39-0.673-0.943c-0.664-0.553-0.996-1.044-0.743-1.096 s-0.362-0.454-1.367-0.912c-1.921-0.875-3.76-1.842-4.983-3.473c-0.35-0.514-0.455-0.957-0.387-1.351 c0.136-0.784,0.891-1.029,1.021-0.853l0.237,0.318c0.469,0.742,1.266,1.311,2.946,1.416c1.095,0.096,1.772,0.721,2.405,1.412 c0.311,0.299,0.621,0.502,0.933,0.59c0.593,0.169,0.886-0.278,0.657-0.414c-0.229-0.137-1.059-0.464-0.811-0.954 s0.842-1.129,0.887-1.602c0.044-0.474-0.672-0.883-0.984-1.131l-0.566-0.448c-0.196-0.127-0.394-0.199-0.59-0.233 c-0.348-0.061-0.797-0.317-1.168-0.492c-0.371-0.174-1.229-0.219-1.181-0.544c0.015-0.104,0.216-0.208,0.487-0.312 c0.65-0.201,1.304-0.168,1.957,0.189c0.539,0.347,1.287,0.456,2.07,0.579c1.092,0.171,2.185,0.398,2.399,0.177 c0.215-0.221,0.291-1.156,0.291-2.002s-0.894-1.275-1.988-1.424c-2.276-0.309-2.786-2.331-3.815-3.733 c-0.654-0.89-1.364-0.496-1.899-0.321c-0.22,0.072-0.539-0.035-0.944-0.298c-0.291-0.223-0.58-0.441-0.869-0.624 c-0.499-0.316-0.194,0.635-0.954,0.853c-0.759,0.218-1.563-0.98-2.084-1.003s-0.229,0.302,0.109,0.857 c0.232,0.381,0.103,0.79-0.518,0.626c-0.602-0.11-1.142-0.087-1.631,0.044c-0.877,0.236-1.1,0.807-0.69,0.84 c0.41,0.032,1.312,0.102,1.587,0.605c0.172,0.314,0.026,0.62-0.56,0.513c-0.383-0.041-0.68,0.024-0.918,0.162 c-0.454,0.262-0.073,0.282,0.409,0.624c0.194,0.138,0.125,0.457-0.283,0.923c-5.099,5.821,3.095,10.341,5.379,16.077 c0.409,1.026,0.057,1.155-0.558,0.237c-5.772-8.608-12.18-10.066-19.096-5.798c-0.94,0.58-0.77,0.986,0.329,0.868 c0.975-0.105,1.951-0.142,2.927,0.058c1.089,0.323,2.048,0.688,1.256,1.17c-1.92,1.131-4.122,2.25-4.974,3.433 c-0.646,0.896-0.271,0.783,0.55,0.044c0.76-0.684,2.127-1.115,3.77-1.432c1.085-0.209,2.38-0.538,2.924-0.57 c0.428-0.025,0.533,0.201,0.336,0.662c-0.273,0.608-0.516,1.217-0.737,1.826c-0.372,1.022,0.03,1.253,0.94,0.626 c10.759-7.406,16.723,12.156,7.102,7.268c-0.985-0.5-1.319-0.205-0.589,0.623c4.049,4.602,10.501-0.012,9.276-8.461 c-0.159-1.093,0.056-1.184,0.451-0.152c1.35,3.517,0.865,7.063-0.905,9.981C24.752,33.6,18.979,36.896,23.4,41.83 c0.737,0.823,0.97,0.618,0.438-0.351c-1.146-2.088-1.571-3.902,1.215-5.856c2.076-1.232,4.244-3.943,5.098-8.238 c0.217-1.082,0.779-1.207,1.027-0.131c0.162,0.705,0.24,1.455,0.295,2.215c0.08,1.103,0.229,1.103,0.244-0.002 c0.027-1.818-0.152-3.655-0.676-5.52C30.743,22.885,30.665,22.149,31.002,22.26z M24.771,2.568c0.46,0,0.833,0.373,0.833,0.833 s-0.373,0.833-0.833,0.833s-0.833-0.373-0.833-0.833C23.937,2.941,24.31,2.568,24.771,2.568z"></path> <path style="fill:#030104;" d="M39.125,14.646c-0.26-0.06-0.494-0.137-0.693-0.222c-1.016-0.435-0.393-1.401-1.096-2.254 c-0.055-0.066-0.107-0.133-0.16-0.201c-0.676-0.872-1.506-0.378-2.383-1.049c-0.127-0.097-0.258-0.214-0.391-0.345 c-0.787-0.774-1.922-0.692-3.017-0.836c-0.278-0.037-0.576-0.094-0.884-0.16c-1.08-0.232-1.227,0.096-0.291,0.683 c0.793,0.498,1.595,0.996,2.141,1.475c0.83,0.729,0.885,1.938,1.418,1.637s1.384-0.322,2.07,0.543 c0.847,1.067,1.863,2.241,3.539,1.744C40.438,15.346,40.204,14.894,39.125,14.646z"></path> </g> </g> </g></svg>';                     
                }

                if(idArray[i][j].style.backgroundColor==color2){
                    idArray[i][j].innerHTML='<svg fill="#000000" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="64px" height="64px" viewBox="-196.38 -196.38 1374.66 1374.66" xml:space="preserve" stroke="#000000" transform="matrix(1, 0, 0, 1, 0, 0)rotate(0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="7.855200000000001"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M861,863.05c0-30.4-24.6-55-55-55H175.9c-30.4,0-55,24.6-55,55s24.6,55,55,55H806C836.4,918.05,861,893.35,861,863.05z"></path> <path d="M65.4,417.85c0.9,0,1.7,0,2.6-0.1l87.2,315.6H491h335.7l87.2-315.6c0.899,0,1.699,0.1,2.6,0.1c36.1,0,65.4-29.3,65.4-65.4 s-29.301-65.4-65.4-65.4s-65.4,29.3-65.4,65.4c0,7,1.101,13.8,3.2,20.1l-157.7,92.2l-169.5-281 c17.601-11.7,29.301-31.8,29.301-54.5c0-36.1-29.301-65.4-65.4-65.4s-65.4,29.3-65.4,65.4c0,22.8,11.601,42.8,29.301,54.5 l-169.5,281l-157.7-92.2c2-6.3,3.2-13.1,3.2-20.1c0-36.1-29.3-65.4-65.4-65.4c-36.2,0-65.5,29.3-65.5,65.4S29.3,417.85,65.4,417.85 z"></path> </g> </g></svg>';  
                }                  
                turno.innerHTML=`Turno: ${jugadorActual==color1?"Dragones":"Coronas"}`;
            }else{
                idArray[i][j].innerHTML=""; 
                turno.innerHTML=`Turno: ${jugadorActual==color1?"Moradas":"Azules"}`;
            }
        }
    }
}

//Listeners
//evento global
const eventoColocar=(columnas)=>{
    //si hay ganador, no se coloca la ficha
    if(comprobarGanador(tablero)){
        return;
    }
    colocarFicha(columnas);
};
//Aplica un event listener a cada columna y usa una funcion para destacarlas

colArray.forEach((columnas)=>{

    columnas.forEach((col)=>{
        col.addEventListener('mouseover', ()=>{
            destacarColumna(columnas,"white");
        });
        col.addEventListener('mouseout', ()=>{
            destacarColumna(columnas,"none");
        });
        col.addEventListener('click',()=>{
            eventoColocar(columnas);
        });
    });
});

daltonicos.addEventListener('click', ()=>{
    //cambia el estado del booleano
    Bdaltonicos=Bdaltonicos?false:true;
    //después llama a la funcion
    modoDaltonicos();  
});

idReiniciarPartida.addEventListener('click',()=>{
    reiniciarPartida();
});
idReiniciarScore.addEventListener('click',()=>{
    reiniciarScore();
});

//comprobaciones

// Código proporcionado por ChatGPT:

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
                
                    return true;
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

                     //asigna estilo al ganador

                    let w1=document.querySelector(`#i${i}j${j}`);
                    let w2=document.querySelector(`#i${i+1}j${j}`);
                    let w3=document.querySelector(`#i${i+2}j${j}`);
                    let w4=document.querySelector(`#i${i+3}j${j}`);                    
                    destacarColumna([w1,w2,w3,w4],"green");
                
                return true;
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
                    
                     //asigna estilo al ganador

                     let w1=document.querySelector(`#i${i}j${j}`);
                     let w2=document.querySelector(`#i${i+1}j${j+1}`);
                     let w3=document.querySelector(`#i${i+2}j${j+2}`);
                     let w4=document.querySelector(`#i${i+3}j${j+3}`);                    
                     destacarColumna([w1,w2,w3,w4],"green");
                 
                return true;
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
                    
                     //asigna estilo al ganador

                     let w1=document.querySelector(`#i${i}j${j}`);
                     let w2=document.querySelector(`#i${i-1}j${j+1}`);
                     let w3=document.querySelector(`#i${i-2}j${j+2}`);
                     let w4=document.querySelector(`#i${i-3}j${j+3}`);                    
                     destacarColumna([w1,w2,w3,w4],"green");
                 
                return true;
            }
        }
    }

    return false; // No hay ganador
}