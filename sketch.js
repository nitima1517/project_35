var balloon
var backgroundImg
var hotairballoon
var mydatabase
var balloonPosition

function preload(){
  mydatabase = firebase.database();
backgroundImg=loadImage("images/Hot Air Ballon-01.png")
hotairballoon=loadAnimation("images/Hot Air Ballon-02.png","images/Hot Air Ballon-03.png","images/Hot Air Ballon-04.png")
}

function setup() {
  createCanvas(1000,700);
 balloon=createSprite(400, 200, 50, 50);
 balloon.addAnimation("hotairballoon",hotairballoon);   
 balloon.scale = 0.4;

 var balloonposref=mydatabase.ref("balloon/position");
 balloonposref.on("value",readposition,error)
}

function draw() {
  background(backgroundImg);
  
  strokeWeight(2);
  stroke("black");
  fill("blue");
  textSize(24);
  text("Use the arrow keys to move the Hot Air Balloon", 30, 30);

  
  if(keyDown(LEFT_ARROW)){
    changePosition(-3,0);
}
else if(keyDown(RIGHT_ARROW)){
    changePosition(3,0);
}
else if(keyDown(UP_ARROW)){
    changePosition(0,-3);
     balloon.scale = balloon.scale-0.05; 
}
else if(keyDown(DOWN_ARROW)){
    changePosition(0,+3);
     balloon.scale = balloon.scale+0.05; 
}

 drawSprites();
}

function changePosition(x,y){
  mydatabase.ref("balloon/position").set(
      {
      'x':balloon.x+x,
      'y':balloon.y+y
      }
  )
}

function readposition(data){
  var position=data.val();
  balloon.x=position.x;
  balloon.y=position.y;
}

function error(){
  console.log("error");
}