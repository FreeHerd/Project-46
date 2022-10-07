var gameState='play'
function preload(){
  playerImg=loadImage("player.png")
  zombie=loadImage('zombie.png')
  bulletImage=loadImage('bullet.png')
  deadplayer=loadImage('dead zombie.png')
}

function setup() {  
  createCanvas(800, 600);

  player=createSprite(400,50)
  player.addImage(playerImg)
  player.scale=0.2

  enemyGroup=createGroup()
  bulletGroup=createGroup()
  score=0
}
function draw() {
  background("black")

  fill ('White')
  textAlign(CENTER)
  textSize(30)
  text ('score = '+score,400,570)
  if(gameState==='play'){
  if(keyDown('left')){
    player.x-=5
  }
  if(keyDown('right')){
    player.x+=5
  }
  enemies()
  if(keyDown('space')){
    if(frameCount%5==0){
      bullets()
    }
  }
  if(player.x<50){
    player.x=50
  }
  if(player.x>width-50){
    player.x=width-50
  }
  for(var i=0;i<bulletGroup.length;i++){
    for(var j=0;j<enemyGroup.length;j++){
      if(bulletGroup[i].isTouching(enemyGroup[j])){
        bulletGroup[i].destroy()
        enemyGroup[j].destroy()
        score+=2000
      }
    }
  }
  edges=createEdgeSprites()
  if(enemyGroup.isTouching(player)||enemyGroup.isTouching(edges[2])){
gameState='end'
  enemyGroup.destroyEach()
  bulletGroup.destroyEach()
  player.x=400
  player.y=300
  player.addImage(deadplayer)
  player.scale=1
  fill('red')
  textSize(40)
  text('Game Over',400,50)
  }
}
  drawSprites()
}

function enemies(){
  if(frameCount%100==0){
    enemy=createSprite(random(50,750),600,10,10)
    enemy.velocityY=-3
    enemy.addImage(zombie)
    enemy.scale=0.4
    enemyGroup.add(enemy)
  }
}
function bullets(){
  bullet=createSprite(player.x,player.y)
  bullet.velocityY=4
  bullet.addImage(bulletImage)
  bullet.scale=0.3
 player.depth+=bullet.depth
 bulletGroup.add(bullet)
}