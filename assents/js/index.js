const gameLoop = 30;
const velocidadeE = 5;
const velocidadeC = 3;
const velocidadeDeNascimento = 100;

/* Variáveis de telcado  */
var TECLA = {
	W: 87,
	S: 83,
	D: 68,
  arrowUp:38,
  arrowDown:40,
  arrowRight:39,
}
/* Fim das Variáveis do teclado  */

/* Variáveis para controle do teclado */
var jogo = [];
jogo.pressionou = [];

/* Fim das Variáveis */

/* Variáveis para posicionamento dos objetos */
var posicaoY = parseInt(Math.random() * 334);
var fimdejogo ='';
/* Fim das Variáveis */


var podeAtirar = true;

let imgColisao = "url(/assents/img/explosao.png)";

/* PLACAR */

let pontos = 0;
let salvos = 0;
let perdidos = 0;

/* FIM PLACAR */

/* Energia */
var energiaAtual = 3;
/* Fim */

/* Som do jogo */
var somDisparo=document.getElementById("somDisparo");
var somExplosao=document.getElementById("somExplosao");
var musica=document.getElementById("musica");
var somGameover=document.getElementById("somGameover");
var somPerdido=document.getElementById("somPerdido");
var somResgate=document.getElementById("somResgate");

musica.addEventListener("ended", function(){ musica.currentTime = 0; musica.play(); }, false);
musica.play();
/* Fim */
let energi = {
  energia3: 'url(/assents/img/energia3.png)',
  energia2: 'url(/assents/img/energia2.png)',
  energia1: 'url(/assents/img/energia1.png)',
  energia0: 'url(/assents/img/energia0.png)'

}

let acompanhar = false;


function start () {
  $(".inicio").hide();

  $(".gameFunction").append("<div id='energia'></div>");
  $(".gameFunction").append("<div id='placar'></div>");
  $(".gameFunction").append("<div id='jogador' class='anima1'></div>");
  $(".gameFunction").append("<div id='inimigo1'class='anima1' ></div>");
  $(".gameFunction").append("<div id='inimigo2'></div>");
  $(".gameFunction").append("<div id='amigo' class='anima3'></div>");
  

  
  
  /* onclick='reiniciaJogo() */
  jogo.time = setInterval(loop,gameLoop)
  
  function loop(){
    moviFundo();
    movendoPlay(jogo);
    moveinimigo1();
    moveinimigo2();
    moveamigo();
    colisao();   
    placar();
    controlePlacar();
    energia();
     
  }
  
  
  /* Verificar teclas pressionada pelo usuário */
  $(document).keydown(function(e){
    jogo.pressionou[e.which] = true;
    });
  
  
  $(document).keyup(function(e){
      jogo.pressionou[e.which] = false;
      
  });


/*   pontos=pontos+100;
  pontos=pontos+50;
  salvos++;
 */
  
  
}

/* **************** FUNÇÕES DO GAME *************** */



/* Movimentação do fundo do game */
function moviFundo(){
  esquerda = parseInt($(".gameFunction").css("background-position"));
  $(".gameFunction").css("background-position",esquerda-1);
}/* end */

/* movimentando Amigo */
function movendoPlay(jogo){
  if (jogo.pressionou[TECLA.W] || jogo.pressionou[TECLA.arrowUp] ) {
		var topo = parseInt($("#jogador").css("top"));
		$("#jogador").css("top",topo-10);
    if (topo <= 0) {
      $("#jogador").css("top",topo+10);
    }
	}
	
	if (jogo.pressionou[TECLA.S] || jogo.pressionou[TECLA.arrowDown]) {
		
		var topo = parseInt($("#jogador").css("top"));
		$("#jogador").css("top",topo+10);	
    if (topo >= 434) {
      $("#jogador").css("top",topo-10);
    }
	}
	
	if (jogo.pressionou[TECLA.D] || jogo.pressionou[TECLA.arrowRight]) {
		
		disparo();
	}
  

}
/* Fim da movimentação */


/* Movimentação do inimigo */
function moveinimigo1(){
  posicaoX = parseInt($("#inimigo1").css("left"));

  $("#inimigo1").css("left", posicaoX - velocidadeE);
  $("#inimigo1").css("top", posicaoY);

  if (posicaoX <= 0) {
    posicaoY = parseInt(Math.random() * 334);
    $("#inimigo1").css("left", 694);
    $("#inimigo1").css("top", posicaoY);
    
  }
}
/* end */

/* Movimentando inimigo */

function moveinimigo2(){
  posicaoX = parseInt($("#inimigo2").css("left"));
  $("#inimigo2").css("left",posicaoX - velocidadeC);
  if (posicaoX <= 0) {
    $("#inimigo2").css("left",775);
  }
}

/* end */

/* Movimenta Amigo */
function moveamigo(){
  posicaoX = parseInt($("#amigo").css("left"));
  $("#amigo").css("left",posicaoX + 2)

  if (posicaoX > 906) {
    $("#amigo").css("left",0);
  }
}
/* end */

/* função de disparo */
function disparo() {
  
  if (podeAtirar === true) {
    podeAtirar = false;
    
    topo = parseInt($("#jogador").css("top"));
    posicaoX = parseInt($("#jogador").css("left"));
    tiroX = posicaoX + 190;
    topoTiro = topo + 50;
    $(".gameFunction").append("<div id='disparo'></div>");
    $("#disparo").css("top",topoTiro);
    $("#disparo").css("left",tiroX);


    let tempoDisparo = window.setInterval(executaDisparo,gameLoop);
    function executaDisparo(){
      posicaoX = parseInt($("#disparo").css("left"));
      $("#disparo").css("left", posicaoX + gameLoop);
      if (posicaoX > 900) {
        window.clearInterval(tempoDisparo);
        tempoDisparo = null;
        $("#disparo").remove();
        podeAtirar = true;
      }
    }
  }


}
/* end */



function colisao(){
  let colisao1 = ($("#jogador").collision($("#inimigo1")));
  let colisao2 = ($("#jogador").collision($("#inimigo2")));
  let colisao3 = ($("#disparo").collision($("#inimigo1")));
  let colisao4 = ($("#disparo").collision($("#inimigo2")));
  let colisao5 = ($("#jogador").collision($("#amigo")));
  let colisao6 = ($("#inimigo2").collision($("#amigo")));


  /* Colisão */

  if (colisao1.length > 0) {

    inimigo1X = parseInt($("#inimigo1").css("left"));
    inimigo1Y = parseInt($("#inimigo1").css("top"));
    explosao1(inimigo1X, inimigo1Y);

    posicaoY =parseInt(Math.random() * 334);
    $("#inimigo1").css("left", 694);
    $("#inimigo1").css("top", posicaoY)
    energiaAtual --;
    
    
    
  }
  function explosao1(inimigo1X, inimigo1Y){
    $(".gameFunction").append("<div id='explosao1'></div>");
    $("#explosao1").css("background-image", imgColisao);
    somExplosao.play();
   

    var div = $("#explosao1");
    div.css("top", inimigo1Y);
    div.css("left",inimigo1X);
    div.animate({width:200, opacity:0}, "slow");

    let tempoExplosao = window.setInterval(removeExplosao,1000);

    function removeExplosao(){
      
      div.remove();
      window.clearInterval(tempoExplosao);
      tempoExplosao=null;
    }
    
  }

  /* Fim colisão 1 */

  /* Colisão 2 */
  if (colisao2.length > 0) {
    inimigo2X = parseInt($("#inimigo2").css("left"));
    inimigo2Y = parseInt($("#inimigo2").css("top"));
    somExplosao.play();
    explosao2(inimigo2X, inimigo2Y);
    energiaAtual --;
    $("#inimigo2").remove();
    reposicionaInimigo2();

  }
  function explosao2(inimigo2X, inimigo2Y){
    $(".gameFunction").append("<div id='explosao2'></div>");
    $("#explosao2").css("background-image",imgColisao);
    let div2 = $("#explosao2");
    

    div2.css("top", inimigo2Y);
    div2.css("left", inimigo2X);
    div2.animate({width:200, opacity:0}, "slow");
    
    var tempoExplosao2 = window.setInterval(removeExplosao2, 1000);

    function removeExplosao2(){
      div2.remove();
      window.clearInterval(tempoExplosao2);
      tempoExplosao2 = null;
    }
  }
  /* Fim colisão 2 */



  /* Explosão 2 sendo usada  */


  /* Colisão 3 */
  if (colisao3.length > 0) {
    inimigo1X = parseInt($("#inimigo1").css("left"));
    inimigo1Y = parseInt($("#inimigo1").css("top"));
    explosao1(inimigo1X,inimigo1Y);
    $("#disparo").css("left",950);

    posicaoY = parseInt(Math.random() * 334);
    $("#inimigo1").css("left",694);
    $("#inimigo1").css("top",posicaoY);
  }  
  /* Fim colisão 3 */

  /* Colisão 4 */
  if (colisao4.length > 0) {
      
    inimigo2X = parseInt($("#inimigo2").css("left"));
    inimigo2Y = parseInt($("#inimigo2").css("top"));
    $("#inimigo2").remove();
    somExplosao.play();

    explosao2(inimigo2X,inimigo2Y);
    $("#disparo").css("left",950);
    
    reposicionaInimigo2();        
  }
  
  /* Fim colisão 4 */

  /* Colisão 5 */
  if (colisao5.length>0) {
    somResgate.play();
    $("#amigo").remove();
    reposicionaAmigo();
    pontos = pontos + 100;
    salvos++;
    
  }
  /* Fim colisão 5 */

  /* colisão 6 */
  if (colisao6.length>0) {	    
    amigoX = parseInt($("#amigo").css("left"));
    amigoY = parseInt($("#amigo").css("top"));
    explosao3(amigoX,amigoY);
    $("#amigo").remove();
    
    energiaAtual --;
      perdidos++;



    
    reposicionaAmigo();
        
  }

  function explosao3(amigoX,amigoY) {
    $("#fundoGame").append("<div id='explosao3' class='anima4'></div");
    $("#explosao3").css("top",amigoY);
    $("#explosao3").css("left",amigoX);

    var tempoExplosao3=window.setInterval(resetaExplosao3, 1000);

    function resetaExplosao3() {
    $("#explosao3").remove();
    window.clearInterval(tempoExplosao3);
    tempoExplosao3=null;
  }
}
  /* Fim da colisão 6 */

  /* Reposição dos personagens */
  function reposicionaInimigo2 (){
    var tempoColisao4 = window.setInterval(reposicionar4, 5000);
    
    function reposicionar4(){
      window.clearInterval(tempoColisao4);
      tempoColisao4 = null;

      if (fimdejogo == false) {
        $(".gameFunction").append("<div id='inimigo2'></div>");
      }
    }

  }

  function reposicionaAmigo(){
    var tempoAmigo = window.setInterval(reposicionar6,6000);

    function reposicionar6(){
      window.clearInterval(tempoAmigo);
      tempoAmigo = null;

      if(fimdejogo == false){
        $(".gameFunction").append("<div id='amigo' class='anima3'></div>");
      }
    }
  }

  /* Fim da reposição  */
}



/* ****************** PLACAR DO JOGO ************************** */


function placar() {
	
  
	$("#placar").html("<h2> Pontos: " + pontos + " Salvos: " + salvos + " Perdidos: " + perdidos + "</h2>");
	
}
function energia() {
  if (energiaAtual == 3) {
    
    $("#energia").css("background-image", energi.energia3);
  }

  if (energiaAtual == 2) {
    
    $("#energia").css("background-image", energi.energia2);
  }

  if (energiaAtual == 1) {
    
    $("#energia").css("background-image", energi.energia1);
  }

  if (energiaAtual == 0) {
    
    $("#energia").css("background-image", energi.energia0);   
    gameOver(); 
    //Game Over
  }

}

function controlePlacar(){
  if (salvos > 0) {
    
  }
}

//Função GAME OVER
function gameOver() {
  if (energiaAtual === 0) {

    fimdejogo = true;
    musica.pause();
    somGameover.play();

    window.clearInterval(jogo.time);    
    jogo.time = null;
    
    $("#jogador").remove();
    $("#inimigo1").remove();
    $("#inimigo2").remove();
    $("#amigo").remove();

    $(".gameFunction").append("<div id='fim' '></div>");
    $("#fim").html("<h1> Game Over </h1><p>Sua pontuação foi: " + pontos + "</p>" + "<div id='reinicia' onClick= reiniciaJogo()><h3>Jogar Novamente</h3></div>");    
    
  }
}

function reiniciaJogo() {
   somGameover.pause();
   $("fim").remove();
   fimdejogo = true;
   start();
}






/* **************** FIM DAS FUNÇÕES DO GAME *************** */