var bg;

var player, ground;

var canvas;

var flag = 1;

var leftdoor = (displayWidth - displayWidth/3) - 20;


function preload(){

  bg = loadImage("images/Backgrounds/grass.png");

  walking = loadAnimation("Animation/walking1.png","Animation/walking2.png");
  standing = loadAnimation("Animation/standing.png");
}


function setup() {
  canvas = createCanvas(displayWidth-30, displayHeight-30);

  ground = createSprite(displayWidth/2, displayHeight - displayHeight/3, displayWidth, 10);

  player = createSprite(100, ground.y - 30, 50, 50);
  player.addAnimation("standing",standing);
  
}


function draw() {
  background(bg);
  player.collide(ground);


  if(keyDown(RIGHT_ARROW)){
    player.x += 10;
    player.changeAnimation("walking",walking);
  }
  if(keyDown(LEFT_ARROW)){
    player.x -= 10;
  }
  // change background from right side
  if(player.x > canvas.width && flag === 1){
    player.x = 10;
    bg = loadImage("images/Backgrounds/desert.png")
    flag = 2;
  }

  if(player.x > canvas.width && flag === 2){
    player.x = 10;
    bg = loadImage("images/Backgrounds/empty.png")
    flag = 3;
  }

  if(player.x > canvas.width && flag === 3){
    player.x = 10;
    bg = loadImage("images/Backgrounds/fall.png")
    flag = 4;
  }
  //change background from left side
  if(player.x < 10 && flag === 4){
    player.x = canvas.width;
    bg = loadImage("images/Backgrounds/empty.png")
    flag = 3;
  }

  if(player.x < 10 && flag === 3){
    player.x = canvas.width;
    bg = loadImage("images/Backgrounds/desert.png")
    flag = 2;
  }
  if(player.x < 10 && flag === 2){
    player.x = canvas.width;
    bg = loadImage("images/Backgrounds/grass.png")
    flag = 1;
  }

  //stop at end of animated background
  if(flag === 4){
    wall = createSprite(canvas.width, displayHeight - displayHeight/3, 10, displayHeight);
    player.collide(wall);
    wall.visible = false;
  }
  if(flag === 1){
    start = createSprite(1, displayHeight - displayHeight/3, 10, displayHeight);
    player.collide(start);
    start.visible = false;
  }

  // // Draw the secret door (slightly different color than castle)
  if(flag === 3){
    fill(193,241,260);
    noStroke();
    rect(1000, 521, 70, 50); 
  }

  //Make secret portal in castle room
  if(flag === 3 && keyDown(UP_ARROW) && player.x > (displayWidth - displayWidth/3) - 20 && player.x < (displayWidth - displayWidth/3) + 20){
    flag = 5;
    bg = loadImage("images/Backgrounds/secret1.jpg") 
  }


  drawSprites();
}

