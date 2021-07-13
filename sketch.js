//Create variables here
var dog,dogImg,dogImg1;
var database;
var foodS=0,foodStock;


function preload()
{
	//load images here
  dogImg=loadImage("images/dogImg.png");
  dogImg1=loadImage("images/dogImg1.png");

}

function setup() 
{
  database=firebase.database();
  createCanvas(500,500);

  dog=createSprite(250,300,150,150);
  dog.addImage(dogImg);
  dog.scale=0.15;
  foodStock=database.ref('Food')
  foodStock.on("value",readStock)

}


function draw() {  
  background("white");
  if (keyWentDown(UP_ARROW)) {
    writeStock(foodS);
    dog.addImage(dogImg1);
  }
  drawSprites();
  //add styles here
  fill("black");
  //stroke("black");
  text("Food Stock : "+foodS,170,200);
  textSize(13);
  text("Press UP_ARROW Key",130,10,300,20);

}

function readStock(data) {
  foodS=data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  } 
  database.ref('/').update({
    Food:x
  })
}
