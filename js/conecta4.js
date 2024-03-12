const col0=document.querySelectorAll('.col0');
const col1=document.querySelectorAll('.col1');
const col2=document.querySelectorAll('.col2');
const col3=document.querySelectorAll('.col3');
const col4=document.querySelectorAll('.col4');
const col5=document.querySelectorAll('.col5');
const col6=document.querySelectorAll('.col6');

const colArray=[col0,col1,col2,col3,col4,col5,col6];

function pintarColumna(columna,color){
    if(color==="none"){
        columna.forEach(col => {
            col.style.boxShadow="none";  
        });
        return; 
    }
    columna.forEach(col => {
        col.style.boxShadow="0 0 15px "+color;  
    });   
}

colArray.forEach((columnas)=>{
    columnas.forEach((col)=>{
        col.addEventListener('mouseover', ()=>{
            pintarColumna(columnas,"white");
        });
        col.addEventListener('mouseout', ()=>{
            pintarColumna(columnas,"none");
        });
    });
});

