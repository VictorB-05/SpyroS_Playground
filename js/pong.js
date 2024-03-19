
var game = function(){
    let time = 12;
    let move = 5;
    let moveJ = 5;
    let pelota = bola.clientWidth;
    let minwidth = (container.clientWidth - juego.clientWidth)/2;
    let minheight = (container.clientHeight-40 - juego.clientHeight)/2;
    let width =  (container.clientWidth/2);
    let height = header.clientHeight + (main.clientHeight/2);
    let maxwidth = container.clientWidth - minwidth;
    let maxheight = minheight + juego.clientHeight;
    let control;
    let player1;
    let player2;
    let scoreP1=0;
    let scoreP2=0;
    console.log(maxwidth,minwidth)
    function start(){
        init();
        control = setInterval(play,time);
    }

    function init(){
        if(scoreP1 ==  7 || scoreP2==7){
            if(scoreP1>scoreP2){
                alert("Jugador1 gana");
            }
            else{
                alert("Jugador2 gana");
            }
            stop();
        }else{
            move = 5;
            document.getElementById("p1").innerHTML = scoreP1;
            document.getElementById("p2").innerHTML = scoreP2;
            bola.style.left = 0;
            bola.state = 1;
            player1 = new Object();
            player2 = new Object();
            player1.keyPress = false;
            player1.keyCode = null;
            player2.keyPress = false;
            player2.keyCode = null;
            jugador1.style.top = height +"px";
            jugador2.style.top = height +"px";
            jugador2.style.left = maxwidth - (jugador2.clientWidth*1.2) +"px";
            bola.style.top = height +"px";
            bola.style.left = width  +"px";
        }
    }

    function stop(){
        clearInterval(control);
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
            if(bola.offsetTop >= maxheight - pelota) bola.state=2;
        }else{
            if(bola.state == 2){
                if(bola.offsetTop <= minheight) bola.state=1;
            }
            else{
                if(bola.state == 3){
                    if(bola.offsetTop >= maxheight - pelota) bola.state=4;
                }
                else{
                    if(bola.offsetTop <= minheight) bola.state=3;
                }
            }
        }
        if(bola.offsetLeft<=minwidth){
            scoreP2++;
            init();
        }
        if(bola.offsetLeft+pelota>=maxwidth){
            scoreP1++;
            init();
        }
    }


    function ChocaJ2B(){
        let choca = false;
        if((bola.offsetLeft >= maxwidth-jugador2.clientWidth-pelota) && (bola.offsetTop >= jugador2.offsetTop)
         && (bola.offsetTop <= (jugador2.offsetTop + jugador2.clientHeight))   ){
            choca = true;
            move++;
        }
        return choca;
    }

    function ChocaJ1B(){
        let choca = false;
        if((bola.offsetLeft <= minwidth+jugador1.clientWidth) && (bola.offsetTop >= jugador1.offsetTop)
         && (bola.offsetTop <= (jugador1.offsetTop + jugador1.clientHeight))   ){
            choca = true;            
            move++;
        }
        return choca;
    }

    function moverJ(){
        if (player1.keyPress){
            if (player1.keyCode == 87){
                if(parseInt(jugador1.style.top)-moveJ*4>minheight){
                    jugador1.style.top = (jugador1.offsetTop - moveJ) + "px";
                }
            }
            if (player1.keyCode == 83){
                if(parseInt(jugador1.style.top)+parseInt(jugador1.clientHeight)+moveJ*3<(maxheight)){
                    jugador1.style.top = (jugador1.offsetTop + moveJ) + "px";               
                }
            }
        }
        if (player2.keyPress){
            if (player2.keyCode == 38){
                if(parseInt(jugador2.style.top)-moveJ*4>minheight){
                    jugador2.style.top = (jugador2.offsetTop - moveJ) + "px";
                }
            }
            if (player2.keyCode == 40){
                if(parseInt(jugador2.style.top)+parseInt(jugador2.clientHeight)+moveJ*3<(maxheight)){
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
