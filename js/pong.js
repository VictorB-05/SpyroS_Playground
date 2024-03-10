
var game = function(){
    let time = 12;
    let move = 5;
    let moveJ = 5;
    let width = document.documentElement.clientWidth - move;
    let height = document.documentElement.clientHeight - document.documentElement.clientHeight*0.12;
    let control;
    let player1;
    let player2;

    function start(){
        init();
        control = setInterval(play,time)
    }

    function init(){
        bola.style.left = 0;
        bola.state = 1;
        bola.direction = 1; //right 1, left 2
        player1 = new Object();
        player2 = new Object();
        player1.keyPress = false;
        player1.keyCode = null;
        player2.keyPress = false;
        player2.keyCode = null;
        jugador1.style.top = (height-160)/2+"px";
        jugador2.style.top = (height-160)/2+"px";
        bola.style.top = (height-64)/2+"px";
        bola.style.left = (width-64)/2+"px";
    }

    function stop(){
        clearInterval(control);
        document.body.style.background = "#f00";
    }

    function play(){
        moverB();
        moverJ();
    }

    function moverB(){
        verEstadoB();
        switch(bola.state){
            case 1://derecha abajo
                bola.style.left = (bola.offsetLeft + move) + "px";
                bola.style.top = (bola.offsetTop + move) + "px";
            break;
            case 2://derecha arriba
                bola.style.left = (bola.offsetLeft + move) + "px";
                bola.style.top = (bola.offsetTop - move) + "px";
            break;
            case 3://izquierda abajo
                bola.style.left = (bola.offsetLeft - move) + "px";
                bola.style.top = (bola.offsetTop + move) + "px";
            break;
            case 4://izquierda arriba
                bola.style.left = (bola.offsetLeft - move) + "px";
                bola.style.top = (bola.offsetTop - move) + "px";
            break;
        }
    }

    function verEstadoB(){
        if(ChocaJ2B()){
            if(bola.state ===1){
                bola.state=3;
            }else{
                bola.state=4;
            }
        }

        if(ChocaJ1B()){
            if(bola.state ===3){
                bola.state=1;
            }else{
                bola.state=2;
            }
        }

        if(bola.state == 1){
            if(bola.offsetTop >= height) bola.state=2;
        }else{
            if(bola.state == 2){
                if(bola.offsetTop <= 0) bola.state=1;
            }
            else{
                if(bola.state == 3){
                    if(bola.offsetTop >= height) bola.state=4;
                }
                else{
                    if(bola.offsetTop <= 0) bola.state=3;
                }
            }
        }
    }


    function ChocaJ2B(){
        let choca = false;
        if((bola.offsetLeft >= width-jugador2.clientWidth) && (bola.offsetTop >= jugador2.offsetTop)
         && (bola.offsetTop <= (jugador2.offsetTop + jugador2.clientHeight))   ){
            return true;
        }
        return false;
    }

    function ChocaJ1B(){
        let choca = false;
        if((bola.offsetLeft <= jugador1.clientWidth) && (bola.offsetTop >= jugador1.offsetTop)
         && (bola.offsetTop <= (jugador1.offsetTop + jugador1.clientHeight))   ){
            choca = true;
        }
        return choca;
    }

    function moverJ(){
        if (player1.keyPress){
            if (player1.keyCode == 87){
                if(parseInt(jugador1.style.top)>moveJ){
                    jugador1.style.top = (jugador1.offsetTop - moveJ) + "px";
                }
            }
            if (player1.keyCode == 83){
                if(parseInt(jugador1.style.top)+moveJ<(height-160)){
                    jugador1.style.top = (jugador1.offsetTop + moveJ) + "px";               
                }
            }
        }
        if (player2.keyPress){
            if (player2.keyCode == 38){
                if(parseInt(jugador2.style.top)>moveJ){
                    jugador2.style.top = (jugador2.offsetTop - moveJ) + "px";
                }
            }
            if (player2.keyCode == 40){
                if(parseInt(jugador2.style.top)+moveJ<(height-160)){
                    jugador2.style.top = (jugador2.offsetTop + moveJ) + "px";
                }
            }
        } 
    }

    document.onkeydown = function(e){
        e = e || this.window.event;
        switch(e.keyCode){
            case 40: //flecha hacia  abajo 
                player2.keyCode = e.keyCode;
                player2.keyPress = true;
            break;
            case 38: //flecha hacia arriba
                player2.keyCode = e.keyCode;
                player2.keyPress = true;
            break;
            case 87: //w
                player1.keyCode = e.keyCode;
                player1.keyPress = true;
            break;
            case 83: //s
                player1.keyCode = e.keyCode;
                player1.keyPress = true;
            break;
        }
    }
    
    document.onkeyup = function (e) {
        if(e.keyCode == 40 || e.keyCode == 38){
            player2.keyPress = false;
        }
        if(e.keyCode == 87 || e.keyCode == 83){
            player1.keyPress = false;
        }
    }

    start();
}();
