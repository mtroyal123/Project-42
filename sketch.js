var backImage,backgr;
var player, player_running;
var ground,ground_img;
var banana, bananaImage, FoodGroup;
var obstacle, obstacleImage, ObstacleGroup;
var END =0;
var PLAY =1;
var gameState = PLAY;
var score;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;

  FoodGroup = createGroup();
  ObstacleGroup = createGroup();

  score = 0;
}

function draw() { 
  background(0);
  
  if(gameState===PLAY){
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }

    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);
    spawnFood();
    spawnObstacles();

    if (FoodGroup.isTouching(player)){
      FoodGroup.destroyEach();
      score = score+2;
      player.scale += 0.03;
    }

    if (player.isTouching(ObstacleGroup)){
      gameState = END;
    }

    if (gameState === END){
      backgr.velocityX = 0;
      player.visible = false;
      FoodGroup.destroyEach();
      ObstacleGroup.destroyEach();
    }
  }

  drawSprites();
  textSize(20);
  fill(255);
  text("Score: "+ score, 600, 50);

  if (gameState === END){
    textSize(30);
    fill(255);
    text("Game Over!", 300, 200);
  }

}


function spawnFood(){
 if (frameCount%80 === 0){
   banana = createSprite(600,250,40,10);
   banana.y = random(120,200);
   banana.addImage(bananaImage);
   banana.scale= 0.07;
   banana.velocityX= -4;

   banana.lifetime= 300;
   player.depth = banana.depth + 1;
   FoodGroup.add(banana);
 }
}

function spawnObstacles(){
  if (frameCount%200 === 0){
    obstacle = createSprite(600, 340, 40,10);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.2;
    obstacle.velocityX = -6;

    obstacle.lifetime= 250;
    ObstacleGroup.add(obstacle);
  }
}