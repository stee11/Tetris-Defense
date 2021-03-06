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
canvas.focus();

var frameCounter = 0;
var opacityCounter = 1;
var sprites = [];
var titleArray =[];
var blockArray =[];
var charArray=[];
var gameArray=[];

//Global bools
var fade=false;
var inTitle=true;
var inChar=false;
var inGame=false;

//Audio instantiation for title screen and versus screen
var title = new Audio("./Sound/Newtitle.wav");
title.loop = true;
title.volume = 0.4
title.play();
var versus = new Audio("./Sound/versus.mp3");
versus.loop = true;
versus.volume = 0;


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
	if(inChar)
	{
		if(title.volume - speed > 0)
		{
			title.volume -= speed;
		}
		else
		{
			title.volume = 0;
		}
	}
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
		else
		{
			if(inChar)
			{
				inChar = false;
				inGame = true;
				versus.play();
				if(title.paused)
				{
					versus.pause();
				}
				//We think this is the reason for long load times in the transition between
				//character and verse screen. I am just going to leave this here.
				/*for(var i = 0; i < charArray.length; i++)
				{
					charArray.splice(i, 1);
				}*/
			}
		}		
	}
}

var fadeIn = function(speed)
{
	if(inGame)
	{
		//makes sure that the title music has already stopped playing
		if(title.volume - speed >= 0)
		{
			title.volume -= speed;
		}
		if(versus.volume + speed <= 0.4)
		{
			console.log(versus.volume + " and " + speed);
			versus.volume += speed;
		}
		else
		{
			versus.volume = 0.4;
		}
	}
	opacityCounter += speed;
	ctx.globalAlpha = opacityCounter;
}

//The mute button
var muteButton = function()
{
	if(!inGame)
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
	else
	{
		if(versus.paused)
		{
			versus.play();
			document.getElementById("Mute").src = "./Graphics/AudioIcon.png"
		}
		else
		{
			versus.pause();
			document.getElementById("Mute").src = "./Graphics/AudioIconMute.png"
		}
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

	//////////////
	//Characters
	//////////////
	
	//trickman instantiation
	var trickmanImage = new Image();
	trickmanImage.src = "./Graphics/TrickManAninmationNoBackground.png";
	var trickman = new Sprite(360, 120, 40, 80);
	var trickmanAnimation=new Animation(trickmanImage, 0,0,40,80,3,8);
	trickman.setAnimation(trickmanAnimation);
	
	//oreo instantiation
	var oreoImage = new Image();
	oreoImage.src = "./Graphics/OreoAnimation.png"
	var oreo = new Sprite(360, 161, 40.33, 39);
	var oreoAnimation = new Animation(oreoImage, 0, 0, 40.33, 39, 3, 4);
	oreo.setAnimation(oreoAnimation);
	
	//Ron Paul instantiation
	var ronPaulImage = new Image();
	ronPaulImage.src = "./Graphics/RonPaulAnimation.png"
	var ronPaul = new Sprite(360, 121, 40, 79);
	var ronPaulAnimation = new Animation(ronPaulImage, 0, 0, 40, 79, 3, 4);
	ronPaul.setAnimation(ronPaulAnimation);
	
	///////////////
	//Title Screen
	///////////////
	
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

	///////////////////
	//Character Select
	///////////////////
	
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

	//////////////
	//Versus Mode
	//////////////
	
	//Versus animations
	var starImage = new Image();
	starImage.src = "./Graphics/Boards/StarAnimation.png"
	var star = new Sprite(361, 470, 28, 23);
	var starAnimation = new Animation(starImage, 0, 0, 28, 23, 2, 4);
	star.setAnimation(starAnimation);
	gameArray.push(star);
	
	var sleepingYoshiImage = new Image();
	sleepingYoshiImage.src = "./Graphics/Boards/YoshiSleepingAnimation.png"
	var sleepingYoshi = new Sprite(376, 350, 49, 44);
	var sleepingYoshiAnimation = new Animation(sleepingYoshiImage, 0, 0, 49, 44, 2, 4);
	sleepingYoshi.setAnimation(sleepingYoshiAnimation);
	gameArray.push(sleepingYoshi);
	
	//Images
	var pointWindow = new Image();
	pointWindow.src = "./Graphics/Boards/PointWindow.png"
	gameArray.push(pointWindow);
	
	var board2 = new Image();
	board2.src = "./Graphics/Boards/2PBoard.png"
	gameArray.push(board2);
	
	var timeWindow = new Image();
	timeWindow.src = "./Graphics/Boards/TimeAndScoreWindow.png"
	gameArray.push(timeWindow);
	
	var board1 = new Image();
	board1.src = "./Graphics/Boards/1PBoard.png"
	gameArray.push(board1);	
	
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
       //console.log(charCode);
       keyPress(charCode);
       if (charCode==8)
       		return false;
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
					fade = true;
					//Lakitu instantiation
					var lakituImage = new Image();
					lakituImage.src = "./Graphics/Characters/Lakitu.png"
					var lakitu = new Sprite(370, 180, 18, 33);
					var lakituAnimation = new Animation(lakituImage, 0, 0, 18, 33, 3, 4);
					lakitu.setAnimation(lakituAnimation);
					var lakituBackground = new Image();
					lakituBackground.src = "./Graphics/Boards/LakituBackground.png"
					gameArray.push(lakitu);
					gameArray.push(lakituBackground);
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
					fade = true;
					//Froggy instantiation
					var froggyImage = new Image();
					froggyImage.src = "./Graphics/Characters/Froggy.png"
					var froggy = new Sprite(370, 180, 24, 23);
					var froggyAnimation = new Animation(froggyImage, 0, 0, 24, 23, 2, 4);
					froggy.setAnimation(froggyAnimation);
					var froggyBackground = new Image();
					froggyBackground.src = "./Graphics/Boards/FroggyBackground.png"	
					gameArray.push(froggy);
					gameArray.push(froggyBackground);
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
					fade = true;
					var ronPaulBackground = new Image();
					ronPaulBackground.src = "./Graphics/Boards/RonPaulBackground.png"
					gameArray.push(sprites[4]);
					gameArray.push(ronPaulBackground);

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
					fade = true;
					//Bumpy instantiation
					var bumptyImage = new Image();
					bumptyImage.src = "./Graphics/Characters/DrFreezeGood.png"
					var bumpty = new Sprite(370, 180, 15, 21);
					var bumptyAnimation = new Animation(bumptyImage, 0, 0, 15, 21, 2, 4);
					bumpty.setAnimation(bumptyAnimation);
					var bumptyBackground = new Image();
					bumptyBackground.src = "./Graphics/Boards/DrFreezeGoodBackground.png"
					gameArray.push(bumpty);
					gameArray.push(bumptyBackground);
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
					fade = true;
					//Blargg instantiation
					var blarggImage = new Image();
					blarggImage.src = "./Graphics/Characters/Blargg.png"
					var blargg = new Sprite(370, 180, 20, 27);
					var blarggAnimation = new Animation(blarggImage, 0, 0, 20, 27, 2, 4);
					blargg.setAnimation(blarggAnimation);
					var blarggBackground = new Image();
					blarggBackground.src = "./Graphics/Boards/BlarggBackground.png"
					gameArray.push(blargg);
					gameArray.push(blarggBackground);
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
					fade = true;
					var trickManBackground = new Image();
					trickManBackground.src = "./Graphics/Boards/TrickManBackground.png"
					gameArray.push(sprites[2]);
					gameArray.push(trickManBackground);
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
					fade = true;
					//Poochie instantiation
					var poochieImage = new Image();
					poochieImage.src = "./Graphics/Characters/Poochie.png"
					var poochie = new Sprite(370, 180, 25, 24);
					var poochieAnimation = new Animation(poochieImage, 0, 0, 25, 24, 3, 4);
					poochie.setAnimation(poochieAnimation);
					var poochieBackground = new Image();
					poochieBackground.src = "./Graphics/Boards/PoochieBackground.png"
					gameArray.push(poochie);
					gameArray.push(poochieBackground);
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
					fade = true;
					//LungeFish instantiation
					var lungeFishImage = new Image();
					lungeFishImage.src = "./Graphics/Characters/LungeFish.png"
					var lungeFish = new Sprite(370, 180, 25, 19);
					var lungeFishAnimation = new Animation(lungeFishImage, 0, 0, 25, 19, 2, 4);
					lungeFish.setAnimation(lungeFishAnimation);
					var lungeFishBackground = new Image();
					lungeFishBackground.src = "./Graphics/Boards/LungeFishBackground.png"
					gameArray.push(lungeFish);
					gameArray.push(lungeFishBackground);
					
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
					fade = true;
					var oreoManBackground = new Image();
					oreoManBackground.src = "./Graphics/Boards/OreoManBackground.png"
					gameArray.push(sprites[3]);
					gameArray.push(oreoManBackground);
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
					fade = true;
					//Wiggler instantiation
					var wigglerImage = new Image();
					wigglerImage.src = "./Graphics/Characters/Wiggler.png"
					var wiggler = new Sprite(370, 180, 24, 32);
					var wigglerAnimation = new Animation(wigglerImage, 0, 0, 24, 32, 2, 4);
					wiggler.setAnimation(wigglerAnimation);
					var wigglerBackground = new Image();
					wigglerBackground.src = "./Graphics/Boards/WigglerBackground.png"
					gameArray.push(wiggler);
					gameArray.push(wigglerBackground);
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
					fade = true;
					//Rafael instantiation
					var rafaelImage = new Image();
					rafaelImage.src = "./Graphics/Characters/Rafael.png"
					var rafael = new Sprite(370, 180, 17, 23);
					var rafaelAnimation = new Animation(rafaelImage, 0, 0, 17, 23, 2, 4);
					rafael.setAnimation(rafaelAnimation);
					var rafaelBackground = new Image();
					rafaelBackground.src = "./Graphics/Boards/RafaelBackground.png"
					gameArray.push(rafael);
					gameArray.push(rafaelBackground);
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
					fade = true;
					//Yoshi instantiation
					var yoshiImage = new Image();
					yoshiImage.src = "./Graphics/Characters/Yoshi.png"
					var yoshi = new Sprite(370, 180, 18, 30);
					var yoshiAnimation = new Animation(yoshiImage, 0, 0, 18, 30, 3, 4);
					yoshi.setAnimation(yoshiAnimation);
					var yoshiBackground = new Image();
					yoshiBackground.src = "./Graphics/Boards/YoshiBackground.png"
					gameArray.push(yoshi);
					gameArray.push(yoshiBackground);
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
	//Prevents the backspace from going back a page.
	event = event || window.event;
	var target = event.target || event.srcElement;
    if (event.keyCode == 8 && !/input|textarea/i.test(target.nodeName))
        return false;
    
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
	else if(inChar) //If not in title screen (In char select screen)
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
			//go to character select
			fade = true;
			if(charArray[3].x == 40 && charArray[3].y == 40) //Cursor on Lakitu
			{
				//Lakitu instantiation
				var lakituImage = new Image();
				lakituImage.src = "./Graphics/Characters/Lakitu.png"
				var lakitu = new Sprite(370, 180, 18, 33);
				var lakituAnimation = new Animation(lakituImage, 0, 0, 18, 33, 3, 4);
				lakitu.setAnimation(lakituAnimation);
				var lakituBackground = new Image();
				lakituBackground.src = "./Graphics/Boards/LakituBackground.png"
				gameArray.push(lakitu);
				gameArray.push(lakituBackground);
			}
			else
			{
				if(charArray[3].x == 150 && charArray[3].y == 40) //Cursor on Bumpty
				{
					//Bumpy instantiation
					var bumptyImage = new Image();
					bumptyImage.src = "./Graphics/Characters/DrFreezeGood.png"
					var bumpty = new Sprite(370, 180, 15, 21);
					var bumptyAnimation = new Animation(bumptyImage, 0, 0, 15, 21, 2, 4);
					bumpty.setAnimation(bumptyAnimation);
					var bumptyBackground = new Image();
					bumptyBackground.src = "./Graphics/Boards/DrFreezeGoodBackground.png"
					gameArray.push(bumpty);
					gameArray.push(bumptyBackground);
				}
				else
				{
					if(charArray[3].x == 260 && charArray[3].y == 40) //Cursor on Poochie
					{
						//Poochie instantiation
						var poochieImage = new Image();
						poochieImage.src = "./Graphics/Characters/Poochie.png"
						var poochie = new Sprite(370, 180, 25, 24);
						var poochieAnimation = new Animation(poochieImage, 0, 0, 25, 24, 3, 4);
						poochie.setAnimation(poochieAnimation);
						var poochieBackground = new Image();
						poochieBackground.src = "./Graphics/Boards/PoochieBackground.png"
						gameArray.push(poochie);
						gameArray.push(poochieBackground);
					}
					else
					{
						if(charArray[3].x == 370 && charArray[3].y == 40) //Cursor on Wiggler
						{
							//Wiggler instantiation
							var wigglerImage = new Image();
							wigglerImage.src = "./Graphics/Characters/Wiggler.png"
							var wiggler = new Sprite(370, 180, 24, 32);
							var wigglerAnimation = new Animation(wigglerImage, 0, 0, 24, 32, 2, 4);
							wiggler.setAnimation(wigglerAnimation);
							var wigglerBackground = new Image();
							wigglerBackground.src = "./Graphics/Boards/WigglerBackground.png"
							gameArray.push(wiggler);
							gameArray.push(wigglerBackground);
						}
						else
						{
							if(charArray[3].x == 40 && charArray[3].y == 183) //Cursor on Froggy
							{
								//Froggy instantiation
								var froggyImage = new Image();
								froggyImage.src = "./Graphics/Characters/Froggy.png"
								var froggy = new Sprite(370, 180, 24, 23);
								var froggyAnimation = new Animation(froggyImage, 0, 0, 24, 23, 2, 4);
								froggy.setAnimation(froggyAnimation);
								var froggyBackground = new Image();
								froggyBackground.src = "./Graphics/Boards/FroggyBackground.png"	
								gameArray.push(froggy);
								gameArray.push(froggyBackground);
							}
							else
							{
								if(charArray[3].x == 150 && charArray[3].y == 183) //Cursor on Blargg
								{
									//Blargg instantiation
									var blarggImage = new Image();
									blarggImage.src = "./Graphics/Characters/Blargg.png"
									var blargg = new Sprite(370, 180, 20, 27);
									var blarggAnimation = new Animation(blarggImage, 0, 0, 20, 27, 2, 4);
									blargg.setAnimation(blarggAnimation);
									var blarggBackground = new Image();
									blarggBackground.src = "./Graphics/Boards/BlarggBackground.png"
									gameArray.push(blargg);
									gameArray.push(blarggBackground);
								}
								else
								{
									if(charArray[3].x == 260 && charArray[3].y == 183) //Cursor on LungeFish
									{
										//LungeFish instantiation
										var lungeFishImage = new Image();
										lungeFishImage.src = "./Graphics/Characters/LungeFish.png"
										var lungeFish = new Sprite(370, 180, 25, 19);
										var lungeFishAnimation = new Animation(lungeFishImage, 0, 0, 25, 19, 2, 4);
										lungeFish.setAnimation(lungeFishAnimation);
										var lungeFishBackground = new Image();
										lungeFishBackground.src = "./Graphics/Boards/LungeFishBackground.png"
										gameArray.push(lungeFish);
										gameArray.push(lungeFishBackground);
									}
									else
									{
										if(charArray[3].x == 370 && charArray[3].y == 183) //Cursor on Rafael
										{
											//Rafael instantiation
											var rafaelImage = new Image();
											rafaelImage.src = "./Graphics/Characters/Rafael.png"
											var rafael = new Sprite(370, 180, 17, 23);
											var rafaelAnimation = new Animation(rafaelImage, 0, 0, 17, 23, 2, 4);
											rafael.setAnimation(rafaelAnimation);
											var rafaelBackground = new Image();
											rafaelBackground.src = "./Graphics/Boards/RafaelBackground.png"
											gameArray.push(rafael);
											gameArray.push(rafaelBackground);
										}
										else
										{
											if(charArray[3].x == 480 && charArray[3].y == 183) //Cursor on Yoshi
											{
												//Yoshi instantiation
												var yoshiImage = new Image();
												yoshiImage.src = "./Graphics/Characters/Yoshi.png"
												var yoshi = new Sprite(370, 180, 18, 30);
												var yoshiAnimation = new Animation(yoshiImage, 0, 0, 18, 30, 3, 4);
												yoshi.setAnimation(yoshiAnimation);
												var yoshiBackground = new Image();
												yoshiBackground.src = "./Graphics/Boards/YoshiBackground.png"
												gameArray.push(yoshi);
												gameArray.push(yoshiBackground);
											}
											else
											{
												if(charArray[3].x == 40 && charArray[3].y == 376) //Cursor on Ron Paul
												{
													var ronPaulBackground = new Image();
													ronPaulBackground.src = "./Graphics/Boards/RonPaulBackground.png"
													gameArray.push(sprites[4]);
													gameArray.push(ronPaulBackground);
												}
												else
												{
													if(charArray[3].x == 150 && charArray[3].y == 376) //Cursor on TrickMan
													{
														var trickManBackground = new Image();
														trickManBackground.src = "./Graphics/Boards/TrickManBackground.png"
														gameArray.push(sprites[2]);
														gameArray.push(trickManBackground);
													}
													else
													{
														if(charArray[3].x == 260 && charArray[3].y == 376) //Cursor on OreoMan
														{
															var oreoManBackground = new Image();
															oreoManBackground.src = "./Graphics/Boards/OreoManBackground.png"
															gameArray.push(sprites[3]);
															gameArray.push(oreoManBackground);
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
		else if (event==8)
		{
			charArray[3].setAnimation(charArray[0]);
		}
	}
	/*else //In the game
	{

	}*/
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

function versusScreen()
{
	ctx.drawImage(gameArray[2], 350, 200); //pointWndow
	ctx.drawImage(gameArray[3], 450, 50); // board2
	ctx.drawImage(gameArray[4], 350, 300); //timeWindow
	ctx.drawImage(gameArray[5], 50, 50); //board1
	gameArray[1].draw(ctx); //sleepingYoshi
	gameArray[6].draw(ctx); //charSprite
	ctx.drawImage(gameArray[7], 61, 60); //charBackground
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
		if(!fade)
		{
			fadeIn(0.02);
		}
		charSelectScreen();
	}	
	else if (inGame)
	{
		if(!fade)
		{
			fadeIn(0.02);
		}
		versusScreen();
	}
	requestAnimFrame(gameLoop, canvas);
}	
	