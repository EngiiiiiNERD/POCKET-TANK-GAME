const velocity = 20;
var ball_1_X = 60;
var ball_1_Y = 390;
var speed_1_X;
var speed_1_Y;
var M_1_X = 60;
var M_1_Y = 390;
var RESULT = false;
var ball_2_X = 690;
var ball_2_Y =  490;
var speed_2_X;
var speed_2_Y;
var NEW_RESULT = false;
var M_2_X = 690;
var M_2_Y = 490;
var PLAYER_1_SCORE = 0;
var PLAYER_2_SCORE = 0;
var TURN = true;
var BLAST = false;
var Power_Level_1;
var Power_Level_2;
var P;
var Q;

    var array = [];
    var height;

var  myExplosion = document.getElementById("myExplosion");

function playExplosionAudio(){
    myExplosion.play();
}


var MissileAudio = document.getElementById("myAudio"); 

function playAudio() { 
    MissileAudio.play(); 
} 

function pauseAudio() { 
    MissileAudio.pause(); 
} 


	
//End of mountain function
 function draw(){
 
    var canvas = document.getElementById('canvas');
	  var ctx = canvas.getContext('2d');

	  ctx.fillStyle = 'orange';
 	  ctx.fillRect(0,0,canvas.width,canvas.height);

    //Circular TANK for player 1
    ctx.fillStyle ='#add8e6';
    ctx.beginPath();
    ctx.arc(M_1_X,M_1_Y,10,0,Math.PI*2,true);
    ctx.fill();
    
	//Circular TANK for player 2
    ctx.fillStyle ='#330000';
    ctx.beginPath();
    ctx.arc(M_2_X,M_2_Y,10,0,Math.PI*2,true);
    ctx.fill();
  
    //Making the mountain    
    ctx.strokeStyle = '#006400';
    for(var x = 0 ; x<800 ; x++)
    {
    	ctx.beginPath();
    	ctx.moveTo(x,canvas.height);
    	ctx.lineTo(x,array[x]);
    	ctx.stroke();
    }
//Scores of both the player
    ctx.fillStyle = 'red';
    ctx.font = '20px sherif';
    ctx.fillText("PLAYER_1_SCORE :-"+PLAYER_1_SCORE,50,25)
    ctx.fill(); 
    ctx.fillStyle = 'red';
    ctx.font = '20px sherif';
    ctx.fillText("PLAYER_2_SCORE :-"+PLAYER_2_SCORE,550,25)
    ctx.fill();
    ctx.strokeStyle = 'red';
    ctx.beginPath();
    ctx.moveTo(0,35);
    ctx.lineTo(800,35);
    ctx.stroke();

    //Display whose turn
    if(TURN){
    ctx.fillStyle = 'red';
    ctx.font = '20px sherif';
    ctx.fillText("It's PLAYER_1's TURN",300,60);
    ctx.fill();	
    }
    if(!TURN){
    ctx.fillStyle = 'red';
    ctx.font = '20px sherif';
    ctx.fillText("It's PLAYER_2's TURN",300,60);
    ctx.fill();	
    }

    if(PLAYER_2_SCORE == 3){
    ctx.fillStyle = 'red';
    ctx.font = '40px sherif';
    ctx.fillText("GAME OVER PLAYER_2 WON",100,200);
    ctx.fill();	
    }
    
    if(PLAYER_1_SCORE == 3){
    ctx.fillStyle = 'red';
    ctx.font = '40px sherif';
    ctx.fillText("GAME OVER PLAYER_1 WON",100,200);
    ctx.fill();	
    }
     
     blast();


}//End of draw function



function blast(){
  //Introduce deep
  var x;
  var y;
  if(TURN && BLAST){
     x = P - 48;
     y = Q -48;
   }
   if(!TURN && BLAST){
    x = P - 48;
    y = Q -48;
   }

    var srcX;
    var srcY;

    var sheetWidth = 960;
    var sheetHeight = 480;

    var cols = 10;
    var rows = 5;
    var width = sheetWidth/cols;
    var height = sheetHeight/rows;

    var currentFrame = 0;

    function updateFrame(){
      currentFrame = ++currentFrame%cols;

      srcX = currentFrame*width;
      srcY = 0;
    }

    var character = new Image();
    character.src = "toon.png";  

    var canvas = document.getElementById('canvas');
    var ctx =  canvas.getContext('2d'); 
      
   // canvas.addEventListener('mousemove',MousePos);
     function drawImage(){

      updateFrame();
   
      ctx.drawImage(character,srcX,srcY,width,height,x,y,width,height);
     

     } 
       
     bomb = setInterval(function(){drawImage();},100); 
     setTimeout(function(){clearInterval(bomb);
      BLAST = false;},2000);
     //End of deep
}


function shoot_1(){
	if(TURN){
    Power_Level_1 = (document.getElementById('PL_1').value/100) + 0.5;
    ball_1_X = 60;
    ball_1_Y = 390;
  playAudio();
	var ang_1 = document.getElementById('myInput').value;

	speed_1_X = Math.cos((Math.PI/180)*ang_1)*velocity*.5*Power_Level_1;
	speed_1_Y = -Math.sin((Math.PI/180)*ang_1)*velocity;
	
    document.getElementById('myInput').value='';
    const frameRate = 30;
    ball_1 =  setInterval(Update_M_1,1000/frameRate);
    NEW_RESULT = false;
    }//end of if condition
    else{
    	alert("IT's NOT YOUR TURN");
    }
}

function Update_M_1(){
	Move_M_1();
	CheckBall_1_Position();
}

function Move_M_1(){
    var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');
    //Drawing background of canvas
	ctx.fillStyle = 'orange';
	ctx.fillRect(0,0,canvas.width,canvas.height);
	//Circular TANK for player 1
    ctx.fillStyle ='#add8e6';
    ctx.beginPath();
    ctx.arc(M_1_X,M_1_Y,10,0,Math.PI*2,true);
    ctx.fill();
    
	//Circular TANK for player 2
    ctx.fillStyle ='#330000';
    ctx.beginPath();
    ctx.arc(M_2_X,M_2_Y,10,0,Math.PI*2,true);
    ctx.fill();
  
    //Making the mountain    
    ctx.strokeStyle = '#006400';
    for(var x = 0 ; x<800 ; x++)
    {
    	ctx.beginPath();
    	ctx.moveTo(x,canvas.height);
    	ctx.lineTo(x,array[x]);
    	ctx.stroke();
    }

   //Draw missile for player 1
    ctx.fillStyle = 'red';
	ctx.beginPath();
	ctx.arc(ball_1_X,ball_1_Y,5,0,Math.PI*2,true);
	ctx.fill();


	//Speed for missile 1
    speed_1_Y = speed_1_Y + (1/3); //using the equation of projectile to kepp chang_1ing the vertical velocity 
    ball_1_X += speed_1_X;
	ball_1_Y += speed_1_Y; 


	if(RESULT)
	{
		clearInterval(ball_1);
		ctx.fillStyle = 'red';
		ctx.font = '48px sherif'
	    ctx.fillText("BURSTED_2",270,100);
	    ctx.fill();

	    PLAYER_1_SCORE++;
	}


	   //Scores of both the player
	ctx.fillStyle = 'red';
    ctx.font = '20px sherif';
    ctx.fillText("PLAYER_1_SCORE :-"+PLAYER_1_SCORE,50,25)
    ctx.fill(); 
    ctx.fillStyle = 'red';
    ctx.font = '20px sherif';
    ctx.fillText("PLAYER_2_SCORE :-"+PLAYER_2_SCORE,550,25)
    ctx.fill();
    ctx.strokeStyle = 'red';
    ctx.beginPath();
    ctx.moveTo(0,35);
    ctx.lineTo(800,35);
    ctx.stroke();

}//End of Move_M_1 function

function showTurn(){
	    ball_1_X = 60;
        ball_1_Y = 390;
        ball_2_X = 690;
        ball_2_Y = 490;
      
}

function CheckBall_1_Position(){
	    var canvas = document.getElementById('canvas');
	    var ctx = canvas.getContext('2d');
	
//Check field
	if(ball_1_X > 800 || ball_1_X < 0 ||
		ball_1_Y > 600 || ball_1_Y <0)
	{  
		console.log("THE BALL RAN OUT OF FIELD");
		clearInterval(ball_1);
	    TURN = false;
        
        draw();
        ctx.fillStyle = 'red'; 
     	ctx.beginPath();
	    ctx.arc(ball_1_X,ball_1_Y,5,0,Math.PI*2,true);
	    ctx.fill();
        clearInterval(ball_1);
        showTurn();

	    ctx.fillStyle = 'blue';
        ctx.font = '20px sherif';
        ctx.fillText("MISSILE_1 RAN OUT OF FIELD",250,100)
        ctx.fill(); 
        
    }

//BURST CHECK FOR 1
	var dx = ball_1_X - 690;
	var dy = ball_1_Y - 490;
	var distance = Math.sqrt(dx*dx + dy*dy);
    
	if(distance < 15)
	{
     P = ball_1_X;
     Q = ball_1_Y;


		pauseAudio();
    playExplosionAudio();

	     RESULT = true;
	     PLAYER_1_SCORE++;
	     TURN = false;
       BLAST = true;
       draw();
       ctx.fillStyle = 'red'; 
       ctx.beginPath();
	     ctx.arc(ball_1_X,ball_1_Y,5,0,Math.PI*2,true);
	     ctx.fill();
       clearInterval(ball_1);
       showTurn();
       ctx.fillStyle = 'blue';
       ctx.font = '20px sherif';
       ctx.fillText("TANK_2 BURSTED",300,100);
       ctx.fill(); 
}


  // CRASH WITH MOUNTAIN
   if(array[Math.floor(ball_1_X)]-ball_1_Y<10)
   {
      P = ball_1_X;
     Q = ball_1_Y;

    pauseAudio();
   	playExplosionAudio();
    console.log('CRASH');
   	clearInterval(ball_1);
    TURN = false;
    BLAST = true;
        draw();
        ctx.fillStyle = 'red'; 
     	ctx.beginPath();
	    ctx.arc(ball_1_X,ball_1_Y,5,0,Math.PI*2,true);
	    ctx.fill();
        clearInterval(ball_1);
        //setTimeout(function(){clearInterval(bomb);},1000);
        showTurn(); 
    ctx.fillStyle = 'blue';
    ctx.font = '20px sherif';
    ctx.fillText("MISSILE_1 HIT THE MOUNTAIN",270,100)
    ctx.fill();    
   }    

}//	End of CheckBall_1_Position




//CODE FOR BALL 2

function shoot_2(){
	if(!TURN){
    Power_Level_2 = (document.getElementById('PL_2').value/100) + 0.5;
    ball_2_X = 690;
    ball_2_Y = 490;
    playAudio();
	var ang_2 = document.getElementById('myNewInput').value;

	speed_2_X = -Math.cos((Math.PI/180)*ang_2)*velocity*.45*Power_Level_2;
	speed_2_Y = -Math.sin((Math.PI/180)*ang_2)*velocity*1.3;
	
    document.getElementById('myNewInput').value='';
    const frameRate = 30;
    ball_2 =  setInterval(Update_M_2,1000/frameRate);
    RESULT = false;
    }
    else{
    	alert("IT's NOT YOUR TURN");
    }
    
} //End of shoot_2

function Update_M_2(){
	Move_M_2();
	CheckBall_2_Position();
}

function Move_M_2(){

	
    var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');
    //Drawing background of canvas
	ctx.fillStyle = 'orange';
	ctx.fillRect(0,0,canvas.width,canvas.height);
	//Circular TANK for player 1
    ctx.fillStyle ='#add8e6';
    ctx.beginPath();
    ctx.arc(M_1_X,M_1_Y,10,0,Math.PI*2,true);
    ctx.fill();
    
	//Circular TANK for player 2
    ctx.fillStyle ='#330000';
    ctx.beginPath();
    ctx.arc(M_2_X,M_2_Y,10,0,Math.PI*2,true);
    ctx.fill();
  
    //Making the mountain    
    ctx.strokeStyle = '#006400';
    for(var x = 0 ; x<800 ; x++)
    {
    	ctx.beginPath();
    	ctx.moveTo(x,canvas.height);
    	ctx.lineTo(x,array[x]);
    	ctx.stroke();
    }


   
    //Drawmissile for player 2
    ctx.fillStyle = 'pink';
    ctx.beginPath();
    ctx.arc(ball_2_X,ball_2_Y,5,0,Math.PI*2,true);
    ctx.fill();

	//Speed for missile 
    speed_2_Y = speed_2_Y + (1/3); //using the equation of projectile to kepp chang_1ing the vertical velocity 
    ball_2_X += speed_2_X;
	ball_2_Y += speed_2_Y; 


	if(NEW_RESULT)
	{
		clearInterval(ball_2);
		ctx.fillStyle = 'red';
		ctx.font = '48px sherif'
	    ctx.fillText("BURSTED_1",270,100);
	    ctx.fill();

	    PLAYER_2_SCORE++;
	}


	   //Scores of both the player
	ctx.fillStyle = 'red';
    ctx.font = '20px sherif';
    ctx.fillText("PLAYER_1_SCORE :-"+PLAYER_1_SCORE,50,25)
    ctx.fill(); 
    ctx.fillStyle = 'red';
    ctx.font = '20px sherif';
    ctx.fillText("PLAYER_2_SCORE :-"+PLAYER_2_SCORE,550,25)
    ctx.fill();
    ctx.strokeStyle = 'red';
    ctx.beginPath();
    ctx.moveTo(0,35);
    ctx.lineTo(800,35);
    ctx.stroke();

}//End of Move_M_1 function
function CheckBall_2_Position(){
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');
      //Check field
	if(ball_2_X > 800 || ball_2_X < 0 ||
		ball_2_Y > 600 || ball_2_Y <0)
	{  
		console.log("THE MISSILE 2 RAN OUT OF FIELD");
		
		
        TURN = true;
        draw();
        
        ctx.fillStyle = 'red'; 
     	ctx.beginPath();
	    ctx.arc(ball_2_X,ball_2_Y,5,0,Math.PI*2,true);
	    ctx.fill();

        showTurn();
        clearInterval(ball_2);

        ctx.fillStyle = 'blue';
        ctx.font = '20px sherif';
        ctx.fillText("MISSILE_2 RAN OUT OF FIELD",250,100)
        ctx.fill(); 
         


	}

//BURST CHECK FOR 2
	var px = ball_2_X - 60;
	var py = ball_2_Y - 390;
	var new_distance = Math.sqrt(px*px + py*py);
    
	if(new_distance < 15)
	{
       P = ball_2_X;
     Q = ball_2_Y;

    pauseAudio();
    playExplosionAudio();
		console.log("YOU BURSTED M_1");
	    NEW_RESULT = true;
	    PLAYER_2_SCORE++;
      BLAST = true;
        TURN = true;
        draw();
        ctx.fillStyle = 'red'; 
     	ctx.beginPath();
	    ctx.arc(ball_2_X,ball_2_Y,5,0,Math.PI*2,true);
	    ctx.fill();
        clearInterval(ball_2);
        showTurn(); 

        ctx.fillStyle = 'blue';
        ctx.font = '20px sherif';
        ctx.fillText("TANK_1 BURSTED",300,100);
        ctx.fill(); 
    }


  // CRASH WITH MOUNTAIN
   if(array[Math.floor(ball_2_X)]-ball_2_Y<10)
   {
      P = ball_2_X;
     Q = ball_2_Y;
    pauseAudio();
    playExplosionAudio();
   	clearInterval(ball_2);
    TURN = true;
    BLAST = true;
     draw();
     ctx.fillStyle = 'red'; 
     ctx.beginPath();
	 ctx.arc(ball_2_X,ball_2_Y,5,0,Math.PI*2,true);
	 ctx.fill();
     showTurn();
     ctx.fillStyle = 'blue';
     ctx.font = '20px sherif';
     ctx.fillText("MISSILE_2 HIT THE MOUNTAIN",270,100)
     ctx.fill();
    
   }    

}//	End of CheckBall_2_Position



function pause(){
  if(TURN){
        clearInterval(ball_1);    
        pauseAudio();
  }
     if(!TURN){
         clearInterval(ball_2);         
         pauseAudio();
     }  

}//Stoping the Game

function resume(){

    const frameRate = 30;
    if(TURN){
       ball_1 =  setInterval(Update_M_1,1000/frameRate);
       playAudio()  
    }
    if(!TURN){
       ball_2 =  setInterval(Update_M_2,1000/frameRate);
       playAudio()
    } 
}

function restart(){
    location.reload();
}


window.onload = function(){

    var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');

  ctx.fillStyle = 'orange';
  ctx.fillRect(0,0,canvas.width,canvas.height);

    //Circular TANK for player 1
    ctx.fillStyle ='#add8e6';
    ctx.beginPath();
    ctx.arc(60,390,10,0,Math.PI*2,true);
    ctx.fill();

  //Circular TANK for player 2
    ctx.fillStyle ='#330000';
    ctx.beginPath();
    ctx.arc(690,490,10,0,Math.PI*2,true);
    ctx.fill();


  var STEP_MAX = 2.5;
    var slope = (Math.random() * STEP_MAX) * 2 - STEP_MAX;
    height = Math.random() * 400;

    var STEP_CHANGE = 1.0;

 // creating the landscape for x=0 to x=50
    for (var x = 0; x <=50; x++) {
    // change height and slope
    height += slope;
    slope += (Math.random() * STEP_CHANGE) * 2 - STEP_CHANGE;

      // clip height and slope to maximum
      if (slope > STEP_MAX) { slope = STEP_MAX };
      if (slope < -STEP_MAX) { slope = -STEP_MAX };
 
      if (height > 400) { 
          height = 400;
          slope *= -1;
      }
      if (height < 300) { 
          height = 300;
          slope *= -1;
      }   

      array.push(height);
   }
 //Creating mountain of constant height
    for(var x=51;x<=70;x++){

      height = 400;
      array.push(height);
    } 

    // height = Math.random() * 550;

 // creating the landscape for x=70 to x=300
    for (var x = 71; x <=300; x++) {
    // change height and slope
    height += slope;
    slope += (Math.random() * STEP_CHANGE) * 2 - STEP_CHANGE;

      // clip height and slope to maximum
      if (slope > STEP_MAX) { slope = STEP_MAX };
      if (slope < -STEP_MAX) { slope = -STEP_MAX };
 
      if (height > 550) { 
          height = 550;
          slope *= -1;
      }
      if (height < 400) { 
          height = 400;
          slope *= -1;
      }   

      array.push(height);
    }  //End of mountain from x=71 to x=300
 

   // height = Math.random() * 450;

 // creating the landscape for x=301 to x=400
    for (var x = 301; x <=400; x++) {
    // change height and slope
    height += slope;
    slope += (Math.random() * STEP_CHANGE) * 2 - STEP_CHANGE;

      // clip height and slope to maximum
      if (slope > STEP_MAX) { slope = STEP_MAX };
      if (slope < -STEP_MAX) { slope = -STEP_MAX };
 
      if (height > 400) { 
          height = 400;
          slope *= -1;
      }
      if (height < 200) { 
          height = 200;
          slope *= -1;
      }   

      array.push(height);
    }  //End of mountain from x=301 to x=400
 

 // creating the landscape for x=401 to x=580
    for (var x = 401; x <=580; x++) {
    // change height and slope
    height += slope;
    slope += (Math.random() * STEP_CHANGE) * 2 - STEP_CHANGE;

      // clip height and slope to maximum
      if (slope > STEP_MAX) { slope = STEP_MAX };
      if (slope < -STEP_MAX) { slope = -STEP_MAX };
 
      if (height > 550) { 
          height = 550;
          slope *= -1;
      }
      if (height < 400) { 
          height = 400;
          slope *= -1;
      }   

      array.push(height);
    }  //End of mountain from x=401 to x=580


 // creating the landscape for x=580 to x=680
    for (var x = 580; x <=680; x++) {
    // change height and slope
    height += slope;
    slope += (Math.random() * STEP_CHANGE) * 2 - STEP_CHANGE;

      // clip height and slope to maximum
      if (slope > STEP_MAX) { slope = STEP_MAX };
      if (slope < -STEP_MAX) { slope = -STEP_MAX };
 
      if (height > 550) { 
          height = 550;
          slope *= -1;
      }
      if (height < 500) { 
          height = 500;
          slope *= -1;
      }   

      array.push(height);
    }  //End of mountain from x=580 to x=680




//Constant height mountain for 681 to 800
  for(var x=681;x<=700;x++){
     height = 500;
     array.push(height);
    }
    
    // creating the landscape for x=701 to x=800
    for (var x = 301; x <=400; x++) {
    // change height and slope
    height += slope;
    slope += (Math.random() * STEP_CHANGE) * 2 - STEP_CHANGE;

      // clip height and slope to maximum
      if (slope > STEP_MAX) { slope = STEP_MAX };
      if (slope < -STEP_MAX) { slope = -STEP_MAX };
 
      if (height > 400) { 
          height = 400;
          slope *= -1;
      }
      if (height < 200) { 
          height = 200;
          slope *= -1;
      }   

      array.push(height);
    }  //End of mountain from x=701 to x=800
    console.log(array);

    for(var x=0;x<=800;x++){
      
      ctx.strokeStyle = 'green';
      ctx.beginPath();
      ctx.moveTo(x, 600);
      ctx.lineTo(x, array[x]);
      ctx.stroke();
    }

    //Scores of both the player
    ctx.fillStyle = 'red';
    ctx.font = '20px sherif';
    ctx.fillText("PLAYER_1_SCORE :-"+PLAYER_1_SCORE,50,25)
    ctx.fill(); 
    ctx.fillStyle = 'red';
    ctx.font = '20px sherif';
    ctx.fillText("PLAYER_2_SCORE :-"+PLAYER_2_SCORE,550,25)
    ctx.fill();
    ctx.strokeStyle = 'red';
    ctx.beginPath();
    ctx.moveTo(0,35);
    ctx.lineTo(800,35);
    ctx.stroke();

    //Display whose turn
    if(TURN){
    ctx.fillStyle = 'black';
    ctx.font = '20px sherif';
    ctx.fillText("It's PLAYER_1's TURN",300,60);
    ctx.fill(); 
    }
    if(!TURN){
    ctx.fillStyle = 'black';
    ctx.font = '20px sherif';
    ctx.fillText("It's PLAYER_2's TURN",300,60);
    ctx.fill(); 
    }

    if(PLAYER_2_SCORE == 3){
    ctx.fillStyle = 'red';
    ctx.font = '40px sherif';
    ctx.fillText("GAME OVER PLAYER_2 WON",100,200);
    ctx.fill(); 
    }
    
    if(PLAYER_1_SCORE == 3){
    ctx.fillStyle = 'red';
    ctx.font = '40px sherif';
    ctx.fillText("GAME OVER PLAYER_1 WON",100,200);
    ctx.fill(); 
    }



  }//End of onload function;