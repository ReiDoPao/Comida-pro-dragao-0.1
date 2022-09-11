
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var angle;

var canhão;
var dagão;
var gargola;
var ground;
var comidas = [];

var score = 0;
var gameOver = false;

function preload(){
 
}


function setup() {
  createCanvas(1200,600);
  angleMode(DEGREES);
  angle = 15;

  canhão = new Canhão (100,400,80,80,angle);

  gargola = createSprite(600,100,30,30)
  gargola.velocityY = 10;

  engine = Engine.create();
  world = engine.world;

  var options = {
    isStatic: true
  }
 

  dagão = Bodies.rectangle(1000,450,200,200,options);
  World.add(world, dagão);
}


function draw() 
{
  background(51);
  rectMode(CENTER);
  Engine.update(engine);
 

  canhão.display();

  for (var i = 0; i < comidas.length; i++) {
    showCanhãoComida(comidas[i], i);

  }


 if (gargola.position.y > 600){
  gargola.velocityY = -10;
 }

 if (gargola.y < 0){
  gargola.velocityY = 10;
 }

  drawSprites();

  rect(dagão.position.x, dagão.position.y,200,200);


}

function keyPressed() {
  if (keyCode === DOWN_ARROW) {
    var canhãoComida = new Comida(canhão.x, canhão.y);
    Matter.Body.setAngle(canhãoComida.body, canhão.angle);
    comidas.push(canhãoComida);
  }
}
function showCanhãoComida(comida, index) {
  if (comida) {
    comida.display();
    comida.animate();
    if (comida.body.position.x >= width || comida.body.position.y >= height - 50) {
        comida.remove(index);
      
    }
  }
}
function keyReleased() {
  if (keyCode === DOWN_ARROW && !gameOver) {
    comidas[comidas.length - 1].shoot();
  }
}

/*function colisao(index){
  for (var i = 0; i <comidas.length; i++){
  if (comidas[index] !== undefined){
  var colision = Matter.SAT.collides(comidas[index].body, gargola.body)
  if (colision.collided){
    Matter.World.remove(world, comidas[index].body);
    delete comidas[index];
  }
}
}
}*/

