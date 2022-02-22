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
    
  }
  function explosao1(inimigo1X, inimigo1Y){
    $(".gameFunction").append("<div id='explosao1'></div>");
    $("#explosao1").css("background-image", imgColisao);

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

    explosao2(inimigo2X, inimigo2Y);

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
    
    var tempoExplosao2 = window.setInterval(removeExplosao2,1000);

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
  
    explosao2(inimigo2X,inimigo2Y);
    $("#disparo").css("left",950);
    
    reposicionaInimigo2();        
  }
  
  /* Fim colisão 4 */

  /* Colisão 5 */
  if (colisao5.length>0) {
    reposicionaAmigo();
    $("#amigo").remove();
  }
  /* Fim colisão 5 */

  /* colisão 6 */
  if (colisao6.length>0) {
	    
    amigoX = parseInt($("#amigo").css("left"));
    amigoY = parseInt($("#amigo").css("top"));
    explosao3(amigoX,amigoY);
    $("#amigo").remove();
        
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
    }
    if(fimdejogo === false){
      $(".gameFunction").append("<div id='amigo' class='anima3'></div>");
    }

    reposicionaAmigo();
    $("#amigo").remove();
  }

  /* Fim da reposição  */
}