//Thanks Kevin Coughlin, we "took" (stole) this from your block game!!! :D 
window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       || 
              window.webkitRequestAnimationFrame || 
              window.mozRequestAnimationFrame    || 
              window.oRequestAnimationFrame      || 
              window.msRequestAnimationFrame     || 
              function( callback ){
                window.setTimeout(callback, 1000 / 60);
              };
    })();
//These are not the global variables you are looking for
var canvas = document.getElementById('canvas1');		
var ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 600;

var frameCounter = 0;
var opacityCounter = 1;
var sprites = [];
var titleArray =[];
var blockArray =[];
var charArray=[];

//Global bools
var fade=false;
var inTitle=true;
var inChar=false;
var inGame=false;

//Audio instantiation for title screen
var title = new Audio("./Sound/Newtitle.wav");
title.loop = true;
title.play();

//Clears Canvas		
var clearCanvas = function()
{
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

//Fade-out transition
var fadeOut = function(speed)
{
	opacityCounter -= speed;
	ctx.globalAlpha = opacityCounter;
	if(opacityCounter <= 0)
	{
		fade = false;
		if(inTitle)
		{
			inTitle = false;
			inChar = true;
			for (var i=sprites.length-1; i>4; i--) //delete all the block references from memory
			{
				sprites.splice(i, 1);
			}
			for (var i=titleArray.length-1; i >=0; i--)
			{
				titleArray.splice(i, 1)
			}
		}
	}
}

var fadeIn = function(speed)
{
	opacityCounter += speed;
	ctx.globalAlpha = opacityCounter;
}

//The mute button
var muteButton = function()
{
	if(title.paused)
	{
		title.play();
		document.getElementById("Mute").src = "./Graphics/AudioIcon.png"
	}
	else
	{
		title.pause();
		document.getElementById("Mute").src = "./Graphics/AudioIconMute.png"
	}
}
	
var init = function()
{
	//block instantiation. Alphabetical order by shape
	blockArray[0]=new Animation(new Image(), 0,0,17,17,0,0);
	blockArray[0].image.src="./Graphics/Circle Block.gif";
	blockArray[2]=new Animation(new Image(), 0,0,17,17,0,0);
	blockArray[2].image.src="./Graphics/Heart Block.gif";
	blockArray[1]=new Animation(new Image(), 0,0,17,17,0,0);
	blockArray[1].image.src="./Graphics/Diamond Block.gif";
	blockArray[3]=new Animation(new Image(), 0,0,17,17,0,0);
	blockArray[3].image.src="./Graphics/Star Block.gif";
	blockArray[4]=new Animation(new Image(), 0,0,17,17,0,0);
	blockArray[4].image.src="./Graphics/Triangle Block.gif";


	//yoshi instantiation
	//This is the small yoshi that runs; most likely will not be used

	/*var yoshiImage = new Image();
	yoshiImage.src = "./Graphics/YoshiTest.png"
	var yoshi = new Sprite(250, 400, 30, 48);
	var runAnim = new Animation(yoshiImage, 0, 0, 30, 48, 12, 4);
	yoshi.setAnimation(runAnim);*/

	//trickman instantiation
	var trickmanImage = new Image();
	trickmanImage.src = "./Graphics/TrickManAninmationNoBackground.png";
	var trickman = new Sprite(600, 100, 106, 212);
	var trickmanAnimation=new Animation(trickmanImage, 0,0,106,212,3,8);
	trickman.setAnimation(trickmanAnimation);
	
	//oreo instantiation
	var oreoImage = new Image();
	oreoImage.src = "./Graphics/OreoAnimation.png"
	var oreo = new Sprite(100, 100, 208, 203);
	var oreoAnimation = new Animation(oreoImage, 0, 0, 208, 203, 3, 4);
	oreo.setAnimation(oreoAnimation);
	
	//Ron Paul instantiation
	var ronPaulImage = new Image();
	ronPaulImage.src = "./Graphics/RonPaulAnimation.png"
	var ronPaul = new Sprite(900, 80, 143, 284);
	var ronPaulAnimation = new Animation(ronPaulImage, 0, 0, 143, 284, 3, 4);
	ronPaul.setAnimation(ronPaulAnimation);
	
	//TitleYoshi instantiation
	TitleYoshiImage = new Image();
	TitleYoshiImage.src = "./Graphics/TitleScreenYoshiAnimation.png"
	//TitleYoshi = new Sprite(200, 40, 68, 96); This used to be the old size
	TitleYoshi = new Sprite(440, 220, 204, 288);
	TitleYoshiStill = new Animation(TitleYoshiImage, 0, 0, 68, 96, 1, 0);
	TitleYoshiBlink = new Animation(TitleYoshiImage, 0, 96, 68, 96, 2, 4);
	TitleYoshiBabyBlink = new Animation(TitleYoshiImage, 0, 192, 68, 96, 2, 4);
	TitleYoshi.setAnimation(TitleYoshiStill);

	//Arrow instantiation
	var arrowImage = new Image();
	arrowImage.src = "./Graphics/arrow.png";
	//var arrow = new Sprite(40,57,40,25); //  40 for both, 57 for start & 108 for finish
	var arrow = new Sprite(30,240,120,75);
	var arrowAnimation = new Animation(arrowImage,0,0,232,201,0,0);
	arrow.setAnimation(arrowAnimation);

	//Title Instantiation
	titleArray[0] =new Image();
	titleArray[0].src="./Graphics/Logo.png";

	//Exit Instantiation
	titleArray[2] =new Image();
	titleArray[2].src="./Graphics/exit1.png";

	//Start Instantiation
	titleArray[1] =new Image();
	titleArray[1].src="./Graphics/start.png";

	//Char select screen instantiation
	charArray[2] = new Image();
	charArray[2].src="./Graphics/CharacterSelectBackground.png";

	//The player 1 selection box
	var p1SelectImage=new Image();
	p1SelectImage.src="./Graphics/1PCharPointer.png";
	charArray[3] = new Sprite(40,40,90,90);

	//The player 1 selection box animations
	charArray[0]=new Animation(p1SelectImage,0,0,92,92,0,0); //Animation for regular
	charArray[1]=new Animation(p1SelectImage,0,0,92,92,2,5); //Animation for selection
	charArray[3].setAnimation(charArray[0]);

	//starts at 0,0
	//height/2

	//The sprites get pushed into an array
	sprites.push(TitleYoshi);
	sprites.push(arrow);
	sprites.push(trickman);
	sprites.push(oreo);
	sprites.push(ronPaul);
	
	gameLoop();
}

//This is the event used to capture keyevents
//The internet told me to do it this way
/*               '.       
        .-""-._     \ \.--|  
       /       "-..__) .-'   
     ಠ_______ಠ             /     
      \'-.__,   .__.,'       
       `'----'._\--'  
     * Whale whale whale, what have we here?
     */

//The keyboard down event
canvas.onkeydown = function(evt) {
       var charCode = evt.which;
       console.log(charCode);
       keyPress(charCode);
   };

//The mouse click event
canvas.onclick=function(evt) {
	//console.log("x is: "+evt.offsetX+"\ny is: "+evt.offsetY); 
	//Use this line above to find x and y of a click
	mouseClick(evt);
};

//This function is called by the canvas.onclick. The event object is passed to it and the 
//offsetX and offsetY variables are manipulated. They are the x and y values in respect to 
//the user's canvas.
function mouseClick(MouseEvent)
{
	if (inTitle)
	{
		if (MouseEvent.offsetX > 150 && MouseEvent.offsetX < 348)
		{
			if (MouseEvent.offsetY>215 && MouseEvent.offsetY < 350)
			{
				if (sprites[1].y==240)
				{
					fade = true;
				}
				else
					sprites[1].y=240;
			}
			else
			{
				if(MouseEvent.offsetY > 392 && MouseEvent.offsetY<530)
				{
						if(sprites[1].y==415)
						{
							window.location="http://whotookspaz.org/randomflash/slowpoked.swf";
						}
						else
							sprites[1].y=415;
				}
			}
		}
	}
	else if(inChar) //Not in title
	{
		if (MouseEvent.offsetX > 50 && MouseEvent.offsetX < 122) //Firt Collumn X
		{
			if (MouseEvent.offsetY > 50 && MouseEvent.offsetY < 122) //First Character
			{
				if (charArray[3].x==40 && charArray[3].y==40)
				{
					charArray[3].setAnimation(charArray[1]);
				}
				else
				{
					charArray[3].setAnimation(charArray[0]);
					charArray[3].x=40; charArray[3].y=40;
				}
					
			}
			else if (MouseEvent.offsetY > 193 && MouseEvent.offsetY < 265) //Second
			{
				if (charArray[3].x==40 && charArray[3].y==183)
				{
					charArray[3].setAnimation(charArray[1]);
				}
				else
				{
					charArray[3].setAnimation(charArray[0]);
					charArray[3].x=40; charArray[3].y=183;
				}
			}
			else if (MouseEvent.offsetY > 385 && MouseEvent.offsetY < 458) //Ron Paul 2012
			{
				if (charArray[3].x==40 && charArray[3].y==376)
				{
					charArray[3].setAnimation(charArray[1]);
				}
				else
				{
					charArray[3].setAnimation(charArray[0]);
					charArray[3].x=40; charArray[3].y=376;
				}
			}
		}
		else if(MouseEvent.offsetX > 160 && MouseEvent.offsetX < 233) //Second Collumn X
		{
			if (MouseEvent.offsetY > 50 && MouseEvent.offsetY < 122) //First Character (Penguin)
			{
				if (charArray[3].x==150 && charArray[3].y==40)
				{
					charArray[3].setAnimation(charArray[1]);
				}
				else
				{
					charArray[3].setAnimation(charArray[0]);
					charArray[3].x=150; charArray[3].y=40;
				}	
			}
			else if (MouseEvent.offsetY > 193 && MouseEvent.offsetY < 265) //Second (Goomba)
			{
				if (charArray[3].x==150 && charArray[3].y==183)
				{
					charArray[3].setAnimation(charArray[1]);
				}
				else
				{
					charArray[3].setAnimation(charArray[0]);
					charArray[3].x=150; charArray[3].y=183;
				}
			}
			else if (MouseEvent.offsetY > 385 && MouseEvent.offsetY < 458) //Tyler Trickman
			{
				if (charArray[3].x==150 && charArray[3].y==376)
				{
					charArray[3].setAnimation(charArray[1]);
				}
				else
				{
					charArray[3].setAnimation(charArray[0]);
					charArray[3].x=150; charArray[3].y=376;
				}
			}
		}
		else if(MouseEvent.offsetX > 270 && MouseEvent.offsetX < 343) //Third Collumn X
		{
			if (MouseEvent.offsetY > 50 && MouseEvent.offsetY < 122) //First Character (Poo-seed)
			{
				if (charArray[3].x==260 && charArray[3].y==40)
				{
					charArray[3].setAnimation(charArray[1]);
				}
				else
				{
					charArray[3].setAnimation(charArray[0]);
					charArray[3].x=260; charArray[3].y=40;
				}
			}
			else if (MouseEvent.offsetY > 193 && MouseEvent.offsetY < 265) //Second (Green Creature guy)
			{
				if (charArray[3].x==260 && charArray[3].y==183)
				{
					charArray[3].setAnimation(charArray[1]);
				}
				else
				{
					charArray[3].setAnimation(charArray[0]);
					charArray[3].x=260; charArray[3].y=183;
				}
			}
			else if (MouseEvent.offsetY > 385 && MouseEvent.offsetY < 458) //Oreo Man
			{
				if (charArray[3].x==260 && charArray[3].y==376)
				{
					charArray[3].setAnimation(charArray[1]);
				}
				else
				{
					charArray[3].setAnimation(charArray[0]);
					charArray[3].x=260; charArray[3].y=376;
				}
			}
		}
		else if(MouseEvent.offsetX > 380 && MouseEvent.offsetX < 453) //Fourth Collumn X
		{
			if (MouseEvent.offsetY > 50 && MouseEvent.offsetY < 122) //First Character (Flower Guy)
			{
				if (charArray[3].x==370 && charArray[3].y==40)
				{
					charArray[3].setAnimation(charArray[1]);
				}
				else
				{
					charArray[3].setAnimation(charArray[0]);
					charArray[3].x=370; charArray[3].y=40;
				}
			}
			else if (MouseEvent.offsetY > 193 && MouseEvent.offsetY < 265) //Second (Darker Penguin guy)
			{
				if (charArray[3].x==370 && charArray[3].y==183)
				{
					charArray[3].setAnimation(charArray[1]);
				}
				else
				{
					charArray[3].setAnimation(charArray[0]);
					charArray[3].x=370; charArray[3].y=183;
				}
			}
		}
		else if(MouseEvent.offsetX > 490 && MouseEvent.offsetX < 563) //LAST X COLLUMN BITCHES!
		{
			if (MouseEvent.offsetY > 193 && MouseEvent.offsetY < 265) //First Character (Yoshi)
			{
				if (charArray[3].x==480 && charArray[3].y==183)
				{
					charArray[3].setAnimation(charArray[1]);
				}
				else
				{
					charArray[3].setAnimation(charArray[0]);
					charArray[3].x=480; charArray[3].y=183;
				}
			}
		}
	}
	else
	{
		//Will be added later
	}
}
function keyPress(event)
{
	if (inTitle)
	{
		if(event == 13)
		{
			if(sprites[1].getY()==240)
			{
				fade = true;
			}
			else
			{
				window.location="http://whotookspaz.org/randomflash/slowpoked.swf";
			}
		}
		else
		{
			if (event==40 || event==38)
			{
				if (sprites[1].getY()==240)
					sprites[1].y=415;
				else
					sprites[1].y=240;
			}
		}
	}
	else //If not in title screen (In char select screen)
	{
		if (event==37) //if left arrow
		{
			if(charArray[3].currentAnimation==charArray[0])
			{
				if (charArray[3].x!=40)
					charArray[3].x-=110;
				else
				{ 
					if (charArray[3].y==183)
					{
						charArray[3].x=480;
					}
					else if (charArray[3].y==376)
						charArray[3].x=260;
					else
						charArray[3].x=370;
				}
			}
		} //end left arrow
		else if (event==39) //Right arrow
		{
			if(charArray[3].currentAnimation==charArray[0])
			{
				if (charArray[3].y==40)
				{
					if (charArray[3].x!=370)
					{
						charArray[3].x+=110;
					}
					else
						charArray[3].x=40;
				}
				else if (charArray[3].y==183)
				{
					if (charArray[3].x!=480)
					{
						charArray[3].x+=110;
					}
					else
						charArray[3].x=40;
				}
				else
				{
					if (charArray[3].x!=260)
						charArray[3].x+=110;
					else
						charArray[3].x=40;
				}
			}
		} //end right arrow
		else if (event==38) //Up arrow
		{
			if(charArray[3].currentAnimation==charArray[0])
			{
				if (charArray[3].y==40)
				{
					if (charArray[3].x==370)
					{
						charArray[3].x=260;
						charArray[3].y=376;
					}
					else
						charArray[3].y=376;
				}
				else if (charArray[3].y==183)
				{
					if (charArray[3].x==480)
					{
						charArray[3].x=370;
						charArray[3].y=40;
					}
					else
						charArray[3].y=40;
				}
				else
				{
					charArray[3].y=183;
				}
			}
		} //end up arrow
		else if (event==40) //Down arrow
		{
			if(charArray[3].currentAnimation==charArray[0])
			{
				if(charArray[3].y==376)
					charArray[3].y=40;
				else if (charArray[3].y==183)
				{
					if (charArray[3].x==480 || charArray[3].x==370)
					{
						charArray[3].x=260;
						charArray[3].y=376;
					}
					else
						charArray[3].y=376;
				}
				else
					charArray[3].y=183;
			}
		} //end down arrow
		else if (event==13)
		{
			charArray[3].setAnimation(charArray[1]);
		}
		else if (event==8)
		{
			charArray[3].setAnimation(charArray[0]);
		}
	}
}

var rainingBlocks = function()
{
	var numBlocks = Math.floor(Math.random()*2+ 1);
	for(var i = 0; i < numBlocks; i++)
	{
		var randX = Math.floor(Math.random()*canvas.width-17);
		var blockType = Math.floor(Math.random()*5);
		sprites.push(new Sprite(randX,0,25,25));
		switch(blockType)
		{
			case 0:
				sprites[sprites.length-1].setAnimation(blockArray[0]);
				break;
			case 1:
				sprites[sprites.length-1].setAnimation(blockArray[1]);
				break;
			case 2:
				sprites[sprites.length-1].setAnimation(blockArray[2]);
				break;
			case 3:
				sprites[sprites.length-1].setAnimation(blockArray[3]);
				break;
			case 4:
				sprites[sprites.length-1].setAnimation(blockArray[4]);
				break;
		}
	}
	for(var i = sprites.length-1; i > 4; i--) //5 is the first block in the sprite array
		{
			sprites[i].draw(ctx);
			if(sprites[i].getY() > canvas.height)
			{
				sprites.splice(i, 1); //get rid of the block and tag for garbage collection
			}
			else
			{
				sprites[i].move(0, 4); //Move it
			}
		}		
}

function charSelectScreen()
{
		ctx.drawImage(charArray[2],0,0);
		for (var i=3;i<charArray.length;i++)
		{
			charArray[i].draw(ctx);
		}
}

var titleScreen = function(title, start, exit)
{
	// Animation for yoshi moving up and down
	if(frameCounter > 50)
	{
		sprites[0].move(0, -0.4);
		sprites[0].setAnimation(TitleYoshiBlink);
	}
	else
	{
		sprites[0].move(0, 0.4);
	}
	if(frameCounter > 54)
	{
		sprites[0].setAnimation(TitleYoshiStill);
	}
	if(frameCounter > 100)
	{
		sprites[0].move(0, 0.4);
		sprites[0].setAnimation(TitleYoshiBabyBlink);
	}
	if(frameCounter > 104)
	{
		sprites[0].setAnimation(TitleYoshiStill);
		frameCounter = 0;
	}
	//adds a counter to frame number
	frameCounter++;
	
	//draws the title screen exit, start, and logo images
	//ctx.drawImage(titleArray[2], 90, 100, 60, 40); //old exit
	ctx.drawImage(titleArray[2], 160, 400, 180, 120); //exit

	//ctx.drawImage(titleArray[0], 90, 10); // old title
	ctx.drawImage(titleArray[0], 60, 50, 702, 166.5); //title

	//ctx.drawImage(titleArray[1], 90, 50, 60, 40); //old start
	ctx.drawImage(titleArray[1], 160, 220, 180, 120); //start

	//draws yoshi going up and down
	sprites[0].draw(ctx); //title yoshi

	//animation for the arrow moving left and right
	if(frameCounter >= 0 && frameCounter <= 13)
	{
		sprites[1].move(-0.8, 0);
	}
	else if (frameCounter > 13 && frameCounter <= 26)
	{
		sprites[1].move(0.8, 0);
	}
	else if(frameCounter <= 39 && frameCounter > 26)
	{
		sprites[1].move(-.8,0);
	}
	else if(frameCounter >39 && frameCounter <= 52)
	{
		sprites[1].move(0.8, 0);
	}
	else if (frameCounter >52 && frameCounter <= 65)
	{
		sprites[1].move(-.8,0);
	}
	else if (frameCounter >65 && frameCounter <= 78)
	{
		sprites[1].move(.8, 0);
	}
	else if(frameCounter <= 91 && frameCounter > 78)
	{
		sprites[1].move(-.8,0);
	}
	else if(frameCounter > 91 && frameCounter <=104)
	{
		sprites[1].move(0.8, 0);
	}
}

var gameLoop = function ()
{
	clearCanvas();
	ctx.globalAlpha = 1;
	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	if(fade)
	{
		fadeOut(0.02);	
	}
	if (inTitle)
	{
		rainingBlocks();
		sprites[1].draw(ctx); //the arrow	
		titleScreen(titleArray[0], titleArray[1], titleArray[2]);
	}
	else if (inChar)
	{
		fadeIn(0.02);
		charSelectScreen();
	}	
	else if (inGame)
	{

	}
	requestAnimFrame(gameLoop, canvas);
}	
	