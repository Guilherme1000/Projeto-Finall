var backgroundImg
var ghost, ghostImg
var boy, boyImg
var restartButton, restart, restartImg
var treasure, treasureImg
var coin, coinImg
var coinGroup
var PLAY = 0
var END = 1
var WIN = 2
var GameState = PLAY
var	ghostGroup
var score = 0
var closedChest, closedChestImg

function preload(){
  backgroundImg = loadImage("./assets/casa_assombrada.jpg")
  ghostImg = loadImage("./assets/Cartoon_ghost.png")
  boyImg = loadImage("./assets/boy-cartoon-removebg-preview.png")
  treasureImg = loadImage("./assets/treasure-cartoon.png")
  restartImg = loadImage("./assets/restart.png")
  coinImg = loadImage("./assets/coin_png.png")
  closedChestImg = loadImage("./assets/closed_chest.png")
}

function setup(){
  createCanvas(600,400)
  //imagem de plano de fundo
  bg = createSprite(300,200,1,1);
  bg.addImage(backgroundImg);
  bg.scale = 1.2

  boy = createSprite(40,200,1,1);
  boy.addImage(boyImg);
  boy.scale = 0.15
  boy.setCollider("Rectangle",0 ,0 ,200 ,400)
  boy.debug = false

  treasure = createSprite(550,360,1,1);
  treasure.addImage("fechado", closedChestImg);
  treasure.addImage("aberto", treasureImg);
  treasure.scale = 0.2

  restart = createSprite(130,25,1,1);
  restart.addImage(restartImg);
  restart.scale = 0.4

  ghostGroup = new Group();
  coinGroup = new Group();

  
}

function draw() {
  background("black");

  if(boy.x < 20){
   boy.x = 20
  }

  if(boy.x > 580){
    boy.x = 580
  }

  if(boy.y < 40){
    boy.y = 40
  }

  if(boy.y > 365){
    boy.y = 365
  }
  
  if(GameState === PLAY){
    createGhost();
    createCoin();
    control();

    if(coinGroup.isTouching(boy)){
      coinGroup.destroyEach()
      score = score + 5
    }

    if(score === 100){
      treasure.changeImage("aberto");
      treasure.scale = 0.07
    }

    if(score === 100 && boy.isTouching(treasure)){
      GameState = WIN
      ghostGroup.setVelocityXEach(0);
    }

    restart.visible = false

    if(ghostGroup.isTouching(boy)){
      GameState = END
    }
  } else if(GameState === END){
    ghostGroup.setVelocityXEach(0);
    restart.visible = true
    if(mousePressedOver(restart)){
      GameState = PLAY
      ghostGroup.destroyEach()
      coinGroup.destroyEach()
      score = 0
    }
  }

  drawSprites();

  if (GameState === WIN){

      textSize(30)
      fill("orange")
      text("voce ganhou!! :)", 300, 200)
  }

  textSize(15)
  text("Pontuacao: " + score, 15, 30)

  if(GameState === END){
    textSize(30)
    fill("orange")
    text("voce perdeu :(", 300, 200)
  }
}

function createGhost(){
  if(frameCount% 60 === 0){
    ghost = createSprite(650, 300)
    ghost.y = Math.round(random(50, 350))
    ghost.addImage(ghostImg)
    ghost.velocityX = -2
    ghost.scale = 0.1

    ghostGroup.add(ghost)

    ghost.debug = false
  }
}

function control(){
  if(keyDown(UP_ARROW)){
    boy.y = boy.y - 4
  }

  if(keyDown(DOWN_ARROW)){
    boy.y = boy.y + 4
  }

  if(keyDown(LEFT_ARROW)){
    boy.x = boy.x - 4
  }

  if(keyDown(RIGHT_ARROW)){
    boy.x = boy.x + 4
  }
}

function createCoin(){
  if(frameCount% 120 === 0){
    y = Math.round(random(50, 350))
    x = Math.round(random(50, 550))
    coin = createSprite(x, y)
    coin.addImage(coinImg)
    coin.scale = 0.05
    coin.debug = false
    coinGroup.add(coin)
  }
}