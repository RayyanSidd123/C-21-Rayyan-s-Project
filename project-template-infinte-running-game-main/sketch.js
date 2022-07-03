var PLAY = 1;
var END = 0;
var gameState = PLAY;

var boy, boy_running, boy_collided;
var ground, invisibleGround, ground_img;

var birdsGroup, bird_img;
var obstacleGroup, stone, grenade, cactus;
var score=0;

var gameOver, Restart;

function preload(){
    
    background_img = loadImage("BackgroundImg.jpg")

    boy_running = loadImage("Boy_running.png")
    boy_collided = loadImage("boy_collided.png")

    ground_img = loadImage("groundImg.png")

    bird_img = loadImage("pngwing.com.png")

    stone = loadImage("Stone.jpg")
    grenade = loadImage("grenade.png")
    cactus = loadImage("cactus.png")

    gameOverImg = loadImage("GameOverImg.png")
    RestartImg = loadImage("Restart.png")

}

function setup() {
    createCanvas(windowWidth, windowHeight);

    boy = createSprite(50,height-70,20,50);

    boy.addAnimation("boy_running", boy_running);
    boy.addAnimation("boy_collided", boy_collided);
    boy.setCollider('circle',0,0,350)
    boy.scale = 0.08

   invisibleGround = createSprite(width/2,height-10,width,125);  
   invisibleGround.shapeColor = "#f4cbaa";

   ground = createSprite(width/2,height,width,2);
   ground.addImage("ground_img", ground_img);
   ground.x = width/2
   ground.velocityX = -(6 + 3*score/100);

   gameOver = createSprite(width/2,height/2- 50);
   gameOver.addImage(gameOverImg);

   Restart = createSprite(width/2,height/2);
   Restart.addImage(RestartImg);

   gameOver.scale = 0.5;
   Restart.scale = 0.1;

   gameOver.visible = false;
   Restart.visible = false;

   birdsGroup = new Group();
   obstacleGroup = new Group();
  
   score = 0;

}

function draw() {

    background("white");
    textSize(20);
    fill("black")
    text("Score: "+ score,30,50);

    if (gameState===PLAY){
        score = score + Math.round(getFrameRate()/60);
        ground.velocityX = -(6 + 3*score/100);
        trex.velocityY = trex.velocityY + 0.8
  
        if (ground.x < 0){
          ground.x = ground.width/2;
        }
      
        boy.collide(invisibleGround);
        spawnBirds();
        spawnObstacles();
      
        if(obstaclesGroup.isTouching(boy)){
            collidedSound.play()
            gameState = END;
        }
      }

      else if (gameState === END) {
        gameOver.visible = true;
        Restart.visible = true;
        ground.velocityX = 0;
        boy.velocityY = 0;
        obstaclesGroup.setVelocityXEach(0);
        birdsGroup.setVelocityXEach(0);

        boy.changeAnimation("collided",boy_collided);

        obstaclesGroup.setLifetimeEach(-1);
        birdsGroup.setLifetimeEach(-1);
    }

       drawSprites();

 }

 function spawnBirds() {
    if (frameCount % 60 === 0) {
        var bird = createSprite(width+20,height-300,40,10);
        bird.y = Math.round(random(100,220));
        bird.addImage(bird_image);
        bird.scale = 0.5;
        bird.velocityX = -3;

        bird.lifetime = 300;

        bird.depth = boy.depth;
    boy.depth = boy.depth+1;

    birdsGroup.add(bird);

    }
} 

function spawnObstacle() {
    if(frameCount % 60 === 0) {
      var obstacle = createSprite(600,height-95,20,30);
      obstacle.setCollider('circle',0,0,45)
    
      obstacle.velocityX = -(6 + 3*score/100);
      
      var rand = Math.round(random(1,2));
      switch(rand) {
        case 1: obstacle.addImage(stone);
                break;
        case 2: obstacle.addImage(grenade);
                break;
        default: break;
      }
              
      obstacle.scale = 0.3;
      obstacle.lifetime = 300;
      obstacle.depth = boy.depth;
      boy.depth +=1;
      
      obstacleGroup.add(obstacle);
    }
  }
  
  function reset(){
    gameState = PLAY;
    gameOver.visible = false;
    Restart.visible = false;
    
    obstacleGroup.destroyEach();
    birdsGroup.destroyEach();
    
    boy.changeAnimation("running",trex_running);
    
    score = 0;
    
  }