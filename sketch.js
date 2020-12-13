var trex,trex_run,trex_collide;
var ground,invisible_ground,ground_image;
var score;
var clouds, clouds1;
var obstacles, obstacles1, obstacles2, obstacles3, obstacles4, obstacles5, obstacles6;
var gameover, reset_btn, gameover_sign;
var reset;
var gamestate;
var obstaclesg, cloudsg;
function preload(){
  trex_run = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trex_collide = loadAnimation("trex_collided.png");
  ground_image = loadImage("ground2.png");
  clouds1 = loadImage("cloud.png")
  obstacles1 = loadImage("obstacle1.png")
  obstacles2 = loadImage("obstacle2.png")
  obstacles3 = loadImage("obstacle3.png")
  obstacles4 = loadImage("obstacle4.png")
  obstacles5 = loadImage("obstacle5.png")
  obstacles6 = loadImage("obstacle6.png")
  gameover_sign = loadImage("gameOver.png")
  reset_btn = loadImage("restart.png")
}
function setup() {
  createCanvas(600, 200);
  trex = createSprite (30, 150);
  ground = createSprite(50, 170);
  invisible_ground = createSprite(50, 180, 500, 10);
  invisible_ground.visible=false
  trex.addAnimation("run", trex_run);
  trex.addAnimation("collided", trex_collide)
  trex.scale = 0.5;
  ground.addAnimation("ground1", ground_image);
  score=0
  gameover = createSprite(600, 500)
  gameover.addImage("gameover", gameover_sign)
  reset = createSprite(500, 500)
  reset.addImage("reset", reset_btn)
  gamestate = "play";
  obstaclesg = new Group()
  cloudsg = new Group()
  
}

function draw() {
  background("white");
  text("Score " + score, 520, 10)
  trex.collide(invisible_ground) 
  if (gamestate==="play") {
   score=score+1
  if((touches.length>0||keyDown("space"))&&trex.y>150){
     trex.velocityY = -10;
     touches = []
     }
  trex.velocityY = trex.velocityY+0.5;
  ground.velocityX=-2;
  if(ground.x<0) {
     ground.x=ground.width/2;
     }
  
    spawn_clouds()
    spawn_obstacles()
    if (obstaclesg.isTouching(trex)) {
      gamestate = "end"
    }
  }
  if (gamestate==="end") {
    gameover.x = 300;
    gameover.y = 50
    reset.x = 300
    reset.y = 100
    ground.velocityX = 0
    cloudsg.setVelocityXEach(0) 
    obstaclesg.setVelocityXEach(0)
    obstaclesg.setLifetimeEach(-2)
    cloudsg.setLifetimeEach(-3)
    trex.changeAnimation("collided", trex_collide)
    trex.velocityY = 0
    if (mousePressedOver(reset)||touches.length>0) {
      touches = []
      gamestate = "play"
      gameover.x = 500
      gameover.y = 500
      reset.x = 600
      reset.y =500
      trex.changeAnimation("run", trex_run)
      obstaclesg.destroyEach();
      cloudsg.destroyEach();
      score = 0
      trex.x = 30
      trex.y = 150
    }
  }
  
  drawSprites();
}
function spawn_clouds() {
  if(frameCount%40===0){
    clouds = createSprite(600, random(50, 120))
    clouds.addImage("clouds", clouds1)
    clouds.velocityX = -5
    clouds.lifetime = 120
    trex.depth = clouds.depth+1
    cloudsg.add(clouds)
  }
}
function spawn_obstacles(){
  if(frameCount%80===0){
    obstacles = createSprite(600, 150)
        //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacles.addImage(obstacles1);
              break;
      case 2: obstacles.addImage(obstacles2);
              break;
      case 3: obstacles.addImage(obstacles3);
              break;
      case 4: obstacles.addImage(obstacles4);
              break;
      case 5: obstacles.addImage(obstacles5);
              break;
      case 6: obstacles.addImage(obstacles6);
              break;
      default: break;
    }
    obstacles.scale = 0.6
    obstacles.velocityX = -5
    obstacles.lifetime = 120
    obstaclesg.add(obstacles)
  }
}