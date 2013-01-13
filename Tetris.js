/**function writeScreen(message)
{
	document.write(message);
}

function Position
{
	this.xcor;
	this.ycor;
	this.block;
};

var posGrid = new Array(7);
for(int i = 0; i < 7; i++)
{
	posGrid[i] = new Array(14);
}**/

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

var canvas = document.getElementById('canvas1');		
var ctx = canvas.getContext('2d');	
var sprites = [];
var frameCounter = 0;
var inTitle=true;

var title = new Audio("./Sound/Newtitle.wav");
title.loop = true;
title.play();
		
var clearCanvas = function()
{
	ctx.save();
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.restore();
}

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
	var bgm = new Audio("Sound/bgm.mp3");
	bgm.loop = true;
	//bgm.play();
	//title.play();

	//yoshi instantiation
	var yoshiImage = new Image();
	yoshiImage.src = "./Graphics/YoshiTest.png"
	var yoshi = new Sprite(250, 400, 30, 48);
	var runAnim = new Animation(yoshiImage, 0, 0, 30, 48, 12, 4);
	yoshi.setAnimation(runAnim);

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
	TitleYoshi = new Sprite(200, 40, 68, 96);
	TitleYoshiStill = new Animation(TitleYoshiImage, 0, 0, 68, 96, 1, 0);
	TitleYoshiBlink = new Animation(TitleYoshiImage, 0, 96, 68, 96, 2, 4);
	TitleYoshiBabyBlink = new Animation(TitleYoshiImage, 0, 192, 68, 96, 2, 4);
	TitleYoshi.setAnimation(TitleYoshiStill);

	//Arrow instantiation
	var arrowImage = new Image();
	arrowImage.src = "./Graphics/arrow.png";
	var arrow = new Sprite(40,108,40,25); //  40 for both, 57 for start & 108 for finish
	var arrowAnimation = new Animation(arrowImage,0,0,232,201,0,0);
	arrow.setAnimation(arrowAnimation);
	
	//The sprites get pushed into an array
	sprites.push(TitleYoshi);
	sprites.push(arrow);
	sprites.push(trickman);
	sprites.push(oreo);
	sprites.push(ronPaul);

	
	gameLoop();
}

////////////////////////////
////////////////////////////
////////////////////////////

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
canvas.onkeydown = function(evt) {
       var charCode = evt.which;
       var charStr = String.fromCharCode(charCode);
       keyPress(charStr);
   };

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
	if (titleScreen)
	{
		if (MouseEvent.offsetX > 225 && MouseEvent.offsetX < 410)
		{
			if (MouseEvent.offsetY>195 && MouseEvent.offsetY < 360)
			{
				sprites[1].y=57;
			}
			else
			{
				if(MouseEvent.offsetY > 392 && MouseEvent.offsetY<565)
					sprites[1].y=108;
			}
		}
	}
	else
	{

	}
}
function keyPress(event)
{
	if (titleScreen)
	{
		if (event=="&" || event=="(")
		{
			if (sprites[1].getY()==57)
				sprites[1].y=108;
			else
				sprites[1].y=57;
		}
	}
	else
	{

	}
}

////////////////////////////
////////////////////////////
///////////////////////////

var rainingBlocks = function()
{
	var circleBlockImage = new Image();
	circleBlockImage.src = "./Graphics/Circle Block.gif"
	var circleBlockAnim = new Animation(circleBlockImage, 0, 0, 17, 17, 0, 0);
	
	var heartBlockImage = new Image();
	heartBlockImage.src = "./Graphics/Heart Block.gif"
	var heartBlockAnim = new Animation(heartBlockImage, 0, 0, 17, 17, 0, 0);
	
	var diamondBlockImage =  new Image();
	diamondBlockImage.src = "./Graphics/Diamond Block.gif"
	var diamondBlockAnim = new Animation(diamondBlockImage, 0, 0, 17, 17, 0, 0);
	
	var starBlockImage = new Image();
	starBlockImage.src = "./Graphics/Star Block.gif"
	var starBlockAnim = new Animation(starBlockImage, 0, 0, 17, 17, 0, 0);
	
	var triangleBlockImage = new Image();
	triangleBlockImage.src = "./Graphics/Triangle Block.gif"
	var triangleBlockAnim = new Animation(triangleBlockImage, 0, 0, 17, 17, 0, 0);

	var numBlocks = Math.floor(Math.random()*0+ 1);
	for(var i = 0; i < numBlocks; i++)
	{
		//window.innerWidth is the size of the window width
		var randX = Math.floor(Math.random()*window.innerWidth -26);
		var newSprite = new Sprite(randX, 0, 17, 17);
		var blockType = Math.floor(Math.random()*5);
		switch(blockType)
		{
			case 0:
				newSprite.setAnimation(circleBlockAnim);
				break;
			case 1:
				newSprite.setAnimation(heartBlockAnim);
				break;
			case 2:
				newSprite.setAnimation(diamondBlockAnim);
				break;
			case 3:
				newSprite.setAnimation(starBlockAnim);
				break;
			case 4:
				newSprite.setAnimation(triangleBlockAnim);
				break;
		}
		sprites.push(newSprite);
	}
}

var titleScreen = function()
{
	
	var logo = new Image();
	logo.src="./Graphics/Logo.png";
	ctx.drawImage(logo, 90,10);
	//ctx.fillStyle = "black";
	//ctx.fillRect(0, 0, canvas.width, canvas.height);
	//ctx.fillStyle = "white";
	//ctx.font = "italic 20pt /Fonts/AGENCYB.ttf";
	//ctx.fillText("Tetris Defense!", 90, 35);
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
	sprites[0].draw(ctx);
	var start = new Image();
	start.src = "./Graphics/start.png"
	//ctx.drawImage(start, window.innerWidth/4, window.innerWidth/6, 366, 85);
	//ctx.drawImage(exit, 0, 0, window.innerWidth/2.5, window.innerHeight*(window.innerHeight*(5/6)));
	var arrowImage = new Image();
	arrowImage.src = "./Graphics/arrow.png"
	frameCounter++;
	var start = new Image();
	start.src = "./Graphics/start.png"
	ctx.drawImage(start, 90, 50, 60, 40);
	var exit = new Image();
	exit.src = "./Graphics/exit1.png"
	ctx.drawImage(exit, 90, 100, 60, 40);

	if(frameCounter >= 0 && frameCounter <= 13)
	{
		//console.log("first called")
		sprites[1].move(-0.8, 0);
	}
	else if (frameCounter > 13 && frameCounter <= 26)
	{
		//console.log("second called")
		sprites[1].move(0.8, 0);
	}
	else if(frameCounter <= 39 && frameCounter > 26)
	{
		//console.log("third called")
		sprites[1].move(-.8,0);
	}
	else if(frameCounter >39 && frameCounter <= 52)
	{
		//console.log("fourth called")
		sprites[1].move(0.8, 0);
	}
	else if (frameCounter >52 && frameCounter <= 65)
	{
		//console.log("fifth called")
		sprites[1].move(-.8,0);
	}
	else if (frameCounter >65 && frameCounter <= 78)
	{
		//console.log("sixth called")
		sprites[1].move(.8, 0);
	}
	else if(frameCounter <= 91 && frameCounter > 78)
	{
		//console.log("seventh called")
		sprites[1].move(-.8,0);
	}
	else if(frameCounter > 91 && frameCounter <=104)
	{
		//console.log("eigth called")
		sprites[1].move(0.8, 0);
	}

}

var gameLoop = function ()
{
	rainingBlocks();
	clearCanvas();
	//ctx.drawImage(background, 0, 0, window.innerWidth, window.innerHeight);
	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
		for(var i = sprites.length-1; i >= 0; i--)
		{
			//this.sprites[i].draw(ctx);
			if(i == 1)
			{
				this.sprites[i].draw(ctx);
			}
			else
			{
				if(i > 4)
				{
					this.sprites[i].draw(ctx);
					if(this.sprites[i].getY() > window.innerHeight)
					{
						this.sprites.splice(i,1);
					}
					else
					{
						this.sprites[i].move(0, 2);
					}

					this.sprites[i].move(0, 2);
				}
			}
		}
		if (inTitle)
		{	
			titleScreen();
		}	
		requestAnimFrame(gameLoop, canvas);
}	
	

