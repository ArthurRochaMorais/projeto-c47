var Engine = Matter.Engine,
    World = Matter.World,
    Events = Matter.Events,
    Bodies = Matter.Bodies; 

var player,imgPlayer;
var moeda0,imgMoeda;
var chaoInvisivel,ImgFundo;
var chao,imgChao;
var inimigo
var boss,imgBoss;
var engine,world;
var Canvas
var EstadoJogo = 1;
var menu;
var fundodomenu
var SelecionarGrupoMoedas
var imageAtk,imageDef;
var contagemMoedas1 = 0;
var contagemMoedas2 = 0;
var contagemMoedas3 = 0;
var grupoAnterior = 0;
var moedas = 0;
var fundoBoss
var playerBoss;
var barreira
var barraX
var barraY
var canvasBoss;

function preload(){
  ImgFundo = loadImage("gamingbackground2.png");
  //imgChao = loadImage();
  //imgPlayer = loadImage("");
  //fundoBoss = loadImage("");
}
function setup(){
  fundoBoss = new chamarBoss();
  fundoBoss.setElementsPosition();
  fundoBoss.hide();
  Canvas = createCanvas(1920,933);
  chao = createSprite(960,830,50,50);
  //player - new Player(100,645);
  player = createSprite(100,645,30,100);
  player.setCollider("rectangle",0,0,player.width,player.height);
  player.debug = false
  //player.addImage("ImagemPlayer",imgPlayer);
  player.scale = 3
  engine = Engine.create();
  world = engine.world;
  menu = new Menu();
  menu.setElementsPosition();
  menu.hide();
  chaoInvisivel = createSprite(960,700,1920,10);
  barreira = createSprite(-100,450,10,933);
  //barraX = createSprite(100,370,10,3000);
  //barraY = createSprite(100,370,3000,10);
  chaoInvisivel.visible = false
  grupoMoedas = new Group();
  grupoInimigos = new Group();

}
function draw(){
  
  
  player.collide(chaoInvisivel);
  console.log(player.y);
  //barraX.x = player.x
  //barraY.y = player.y
  if(barreira.isTouching(grupoInimigos)){
    grupoInimigos[0].destroy();
  }
  if(barreira.isTouching(grupoMoedas)){
    grupoMoedas[0].destroy();
  }
  if(EstadoJogo === 1){
    background(ImgFundo);
    player.velocityY += 2
    if(player.isTouching(grupoMoedas)){    
      grupoMoedas[0].destroy();
      moedas += 1;
    }
    if(player.isTouching(grupoInimigos)){    
      grupoInimigos[0].destroy();    
      moedas -= 1;  
    }
  
    textSize(25);
    text("Moedas : "  + moedas,1700,100);
    chao.velocityX = -5
    
    player.display();
    
    gerarMoedasAleatorias(); 
    if(moedas > 0 ){
    gerarInimigosAleatorios();
    }
    grupoMoedas.setVelocityXEach(-8);
    grupoInimigos.setVelocityXEach(-8);
      if(chao.x < 360){
        chao.x = 960
      }
      if(keyDown("SPACE") && EstadoJogo === 1 && player.y > 540){
        player.velocityY = -30     
      }
      if(keyDown("UP_ARROW")){
        EstadoJogo = 2
      }
      if(keyDown("RIGHT_ARROW")){
        EstadoJogo = 3
      }
      //if(){

      //}
      //if(keyDown("RIGHT_ARROW")){
      //  player.velocityX = 8
      //}else{
       // player.velocityX = 0
      //}
  }
  if(EstadoJogo === 2 ){
    background(ImgFundo);
    chao.velocityX = 0
    menu.display();
    grupoMoedas.setVelocityXEach(0);
    grupoInimigos.setVelocityXEach(0);
    textSize(25);
    text("Moedas : "  + moedas,1700,100);
    if(keyDown("LEFT_ARROW") && EstadoJogo === 2){
      menu.hide();
      EstadoJogo = 1
    }
  }
  if(EstadoJogo === 3){
    
    //background();
    grupoMoedas.destroyEach();
    grupoInimigos.destroyEach();
    fundoBoss.display();

  }
  drawSprites();

}
function gerarMoedasAleatorias(){
  if (frameCount % 60 === 0) {
    moeda0 = createSprite(windowWidth,120,40,10);
    moeda0.y = Math.round(random(200,300));
    //nuvem.addImage(imagemDaNuvem);
    //nuvem.scale = 0.5;
    moeda0.velocityX = -8;
    
     //atribuir tempo de duração à variável
   
          
    //adicionando nuvem ao grupo
   grupoMoedas.add(moeda0);
  }
  
}
function gerarInimigosAleatorios(){
  if (frameCount % 100 === 0) {
    inimigo = createSprite(windowWidth,120,40,10);
    inimigo.y = 680;
    //nuvem.addImage(imagemDaNuvem);
    //nuvem.scale = 0.5;
    inimigo.velocityX = -8;
    
     //atribuir tempo de duração à variável  
    //adicionando nuvem ao grupo
   grupoInimigos.add(inimigo);
  }
}
    
