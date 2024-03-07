
var game = function(){
    let time = 30;
    let move = 20;
    let moveJ = 20;
    let width = document.documentElement.clientWidth - move;
    let height = document.documentElement.clientHeight - move;
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

    }

    function stop(){
        clearInterval(control);
        document.body.style.background = "#f00";
    }

    function play(){
        moverJ();
    }

    function moverJ(){
        if (player1.keyPress){
            if (player1.keyCode == 87){
                jugador1.style.top = (jugador1.offsetTop - moveJ) + "px";
            }
            if (player1.keyCode == 83){
                jugador1.style.top = (jugador1.offsetTop + moveJ) + "px";
            }
        }
        if (player2.keyPress){

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
        if(e.keyCode == 40 || e.keyCode == 38){
            player1.keyPress = false;
        }
    }

    start();
}();
