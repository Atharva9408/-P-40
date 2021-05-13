class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    car1.addImage(C1img)
    car2 = createSprite(300,200);
    car2.addImage(C2img)
    car3 = createSprite(500,200);
    car3.addImage(C3img)
    car4 = createSprite(700,200);
    car4.addImage(C4img)
    cars = [car1, car2, car3, car4];
  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    
    if(allPlayers !== undefined){
      //var display_position = 100;
      background(rgb(198,135,103));
      image(trackimg,0,-displayHeight*4,displayWidth,displayHeight*4)
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 180;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){
        //  cars[index - 1].shapeColor = "red";
          fill("red")
          ellipse(x,y,50);
          fill("yellow")
          text(allPlayers[plr].name,x-10,y-50)
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }
    if(player.distance>4400){
      gameState=2
    }

    drawSprites();
  }

  end(){
    console.log("Game End")
    textSize(30);
    fill("yellow")
    text("Game Over",camera.position.x,camera.position.y);
  }
}