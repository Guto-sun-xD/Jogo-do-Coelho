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

function preload()
{
  fruitImg = loadImage("assets/melon.png");
  bgImg = loadImage("assets/background.png");
  bunnyImg = loadImage("assets/Rabbit-01.png");
}

function setup() 
{
  createCanvas(500,700);
  frameRate(80);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(200,680,600,20);
  rope = new Rope(5,{x: 50,y:50});
  fruit = Bodies.circle(100,100,25);
  World.add(world,fruit);
  link = new Link(rope,fruit);
  bunny = createSprite(60,620);
  bunny.addImage(bunnyImg);
  bunny.scale = 0.22
  button = createImg("assets/cut_btn.png");
  button.position(25,40);
  button.size(60,60);
  button.mouseClicked(cortar);
  

  imageMode(CENTER);
  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
}

function draw() 
{
  background(51);

  image(bgImg,width/2,height/2,500,700);


  //ground.show();
  rope.show();
  
  
  image(fruitImg,fruit.position.x, fruit.position.y,50,50);
  Engine.update(engine);
  

 
  drawSprites();
}
 function cortar(){
   rope.break();
   link.soltar();
   link = null;
  }