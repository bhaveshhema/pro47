var player, player2;
var playerImg, player2Img, life, star,starImg;
var obstacleImg, backGround, Reset, ganmeOver, resetImg, gameOverImg;
var score=0;
var PLAY = 1;
var END = 0;
var gameState=PLAY;

function preload() {
 playerImg = loadImage("images/player.png");
 bg = loadImage('images/background.jpg');
 bg2 = loadImage('images/background2.jpg');
 crowImg = loadImage('images/crow.png');
 starImg = loadImage('images/star.png');
 obstacleImg = loadImage('images/Obstacle1.png');
 gameOverImg = loadImage('images/gameOver.png');
 resetImg = loadImage('images/reset.png');
}

function setup() {
  createCanvas(windowWidth,windowHeight);

  backGround = createSprite(width/2,height/2,width,height);
  backGround.addImage("BackImg",bg);
  backGround.addImage("Stage2",bg2);
  backGround.velocityX = -3;
  
  player = createSprite(250,150,50,50)
  player.addImage(playerImg);
  player.scale = 0.2;

  scoreStar = createSprite(60,80,50,50)
  scoreStar.addImage(starImg);
  scoreStar.scale = 0.1;

  gameOver = createSprite(width/2,height/2);
  gameOver.addImage(gameOverImg);

  Reset = createSprite(width/2,height-150);
  Reset.addImage(resetImg);
  Reset.scale=0.3

  life = 20;
  

  crowGroup = new Group();
  starGroup = new Group();
  snowmanGroup = new Group();
}

function draw() {
 if(gameState===PLAY){

    backGround.visible = true;
    player.visible = true; 
    gameOver.visible=false;
    Reset.visible=false;

    if(backGround.x <= width/3){
      backGround.x = width/2;
    }

    if (keyDown("UP")){
      player.y = player.y - 5;
    }
    if (keyDown("Down")){
      player.y = player.y + 5;
    }

    

    if (starGroup.isTouching(player)){
      score = score+Math.round(getFrameRate()/60);
    }

    spawnCrow ()
    spawnStars ()

    if (score >= 20){
      stage2();
    }

    if (crowGroup.isTouching(player) || snowmanGroup.isTouching(player)){
      life = life - Math.round(getFrameRate()/60);
    }

    if(life <= 0){
      gameState = END;
    }
    
  }

  else if (gameState === END ){
    backGround.visible = false;
    player.visible = false;
    Reset.visible = true;
    gameOver.visible = true;
    crowGroup.destroyEach();
    starGroup.destroyEach();
    snowmanGroup.destroyEach();

    if(mousePressedOver(Reset))
      {
        reset();
      }    
  }

  //camera.position.x = player.x;
  //camera.position.y = player.y;
  
  drawSprites()
  fill('black')
  textSize(30);
  text("life:"+life,50,50);
  text(':'+score,90,90);
 
}

function stage2 (){
  //background(bg2);
  backGround.changeImage("Stage2");
  backGround.scale=1.9;
  spawnSnowman ();
  crowGroup.destroyEach();
  fill('black')
  textSize(30);
  text("life:"+life,50,50);
  text(':'+score,90,90);
}

function spawnCrow () {
  if (frameCount % 120 === 0){
    crow = createSprite(width-10,150,50,50)
    crow.addImage(crowImg);
    crow.scale = 0.15;
    crow.velocityX = -10
    crow.y = Math.round(random(100,300))
    crowGroup.add(crow);
  }
}

function spawnSnowman () {
  if (frameCount % 60 === 0){
    snowman = createSprite(width-10,height-100,50,50)
    snowman.addImage(obstacleImg);
    snowman.scale = 0.04;
    snowman.velocityX = -10
    snowmanGroup.add(snowman);
  }
}

function spawnStars () {
  if (frameCount % 80 === 0){
    star = createSprite(width-10,150,50,50)
    star.addImage(starImg);
    star.scale = 0.15;
    star.velocityX = -10
    star.y = Math.round(random(100,300))
    starGroup.add(star);
  }
}

function reset (){
  gameState = PLAY;
  Reset.visible = false;
  gameOver.visible = false;
}
