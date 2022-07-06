const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground;
var rope;
var fruit, fruitImg;
var bgImg, bunnyImg;
var link;
var bunny;
var button;
var blinkImg, eatImg, sadImg;
var air_sound, cutting_sound, eat_sound, rope_sound, sad_sound, sound;
var air;
var mute;
var canW, canH;

function preload()
{
  fruitImg = loadImage("assets/melon.png");
  bgImg = loadImage("assets/background.png");
  bunnyImg = loadImage("assets/Rabbit-01.png");
  blinkImg = loadAnimation("assets/blink_1.png", "assets/blink_2.png", "assets/blink_3.png");
  eatImg = loadAnimation("assets/eat_0.png", "assets/eat_1.png", "assets/eat_2.png", "assets/eat_3.png", "assets/eat_4.png");
  sadImg = loadAnimation("assets/sad_1.png", "assets/sad_2.png", "assets/sad_3.png");
  air_sound = loadSound("assets/air.wav");
  cutting_sound = loadSound("assets/Cutting Through Foliage.mp3");
  eat_sound = loadSound("assets/eating_sound.mp3");
  sad_sound = loadSound("assets/sad.wav");
  sound = loadSound("assets/sound1.mp3");
  rope_sound = loadSound("assets/rope_cut.mp3");

  blinkImg.playing = true;
  blinkImg.looping = true;
  //eat e sad
  eatImg.playing = true;
  eatImg.looping = false;
  sadImg.playing = true;
  sadImg.looping = false;
}

function setup() 
{
  //createCanvas(500,700);
  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if(isMobile){
    canW = displayWidth;
    canH = displayHeight;
    createCanvas(canW+80,canH);
  }
  else{
    canW = windowWidth;
    canH = windowHeight;
    createCanvas(canW,canH);
  }

  frameRate(80);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(200,canH-20,600,20);
  rope = new Rope(5,{x: 50,y:50});
  fruit = Bodies.circle(100,100,25);
  World.add(world,fruit);
  World.add(world,ground)
  link = new Link(rope,fruit);

  blinkImg.frameDelay = 20;
  //eat e sad
  eatImg.frameDelay = 13;
  sadImg.frameDelay = 13;

  bunny = createSprite(360,canH-80);
  bunny.addImage(bunnyImg);
  bunny.scale = 0.22;

  bunny.addAnimation('piscando',blinkImg);
  bunny.addAnimation('comendo',eatImg);
  bunny.addAnimation('triste',sadImg);

  bunny.changeAnimation('piscando');

  button = createImg("assets/cut_btn.png");
  button.position(25,40);
  button.size(60,60);
  button.mouseClicked(cortar);
  
  air = createImg("assets/balloon.png");
  air.position(325,40);
  air.size(60,60);
  air.mouseClicked(force);

  mute = createImg("assets/mute.png");
  mute.position(225,20);
  mute.size(60,60);
  mute.mouseClicked(mutar);
  
  sound.play();
  sound.setVolume(0.25);

  imageMode(CENTER);
  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
}

function draw() 
{
  background(51);

  image(bgImg,width/2,height/2,canW+80,canH);


  //ground.show();
  rope.show();
  
  if(fruit != null){
  image(fruitImg,fruit.position.x, fruit.position.y,50,50);
  }

  Engine.update(engine);
  
  if(collide(fruit,bunny) == true){
    
    bunny.changeAnimation('comendo');
    eat_sound.play();
    eat_sound.setVolume(0.4);

  }
 
  if(fruit != null && fruit.position.y >= canH-70){
    fruit = null;
    bunny.changeAnimation('triste');
    
    sad_sound.play();
    sad_sound.setVolume(0.5);

  }

  drawSprites();
}
 function cortar(){
   rope.break();
   link.soltar();
   link = null;
  
   cutting_sound.play();
   cutting_sound.setVolume(0.5);

  }
  function collide(body,sprite){
  if (body != null){
    var distance = dist(body.position.x, body.position.y, sprite.position.x, sprite.position.y) 
    if(distance <= 80){
      World.remove(world,fruit);
      fruit = null;
      return true;
      
    }
    else{
      return false;
    } 
  }
  }

  function force(){
    Body.applyForce(fruit,{ x:0, y:0},{ x:0.1 , y:0 });
    air_sound.play();
    air_sound.setVolume(0.5);
  }

  function mutar(){
    if(sound.isPlaying()){
    //sound.setVolume(0)
    sound.stop();
    }
    else{
    sound.play();
    }
  }
  