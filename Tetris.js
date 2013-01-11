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
		
var clearCanvas = function()
{
	ctx.save();
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.restore();
}

var init = function()
{	
	var bgm = new Audio("Sound/bgm.mp3");
	bgm.loop = true;
	//bgm.play();
	var title = new Audio("Sound/title.mp3");
	title.loop = true;
	title.play();

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
	TitleYoshi = new Sprite(110, 40, 68, 96);
	TitleYoshiStill = new Animation(TitleYoshiImage, 0, 0, 68, 96, 1, 0);
	TitleYoshiBlink = new Animation(TitleYoshiImage, 0, 96, 68, 96, 2, 4);
	TitleYoshiBabyBlink = new Animation(TitleYoshiImage, 0, 192, 68, 96, 2, 4);
	TitleYoshi.setAnimation(TitleYoshiStill);
	
	//The sprites get pushed into an array
	sprites.push(TitleYoshi);
	sprites.push(yoshi);
	sprites.push(trickman);
	sprites.push(oreo);
	sprites.push(ronPaul);

	
	gameLoop();
}

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

	var numBlocks = Math.floor(Math.random()*10+ 5);
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
	//ctx.fillStyle = "black";
	//ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = "white";
	ctx.font = "italic 20pt Agency Fb";
	ctx.fillText("Tetris Defense!", 90, 35);
	if(frameCounter > 100)
	{
		sprites[0].move(0, -0.2);
		sprites[0].setAnimation(TitleYoshiBlink);
	}
	else
	{
		sprites[0].move(0, 0.2);
	}
	if(frameCounter > 108)
	{
		sprites[0].setAnimation(TitleYoshiStill);
	}
	if(frameCounter > 200)
	{
		sprites[0].move(0, 0.2);
		sprites[0].setAnimation(TitleYoshiBabyBlink);
	}
	if(frameCounter > 208)
	{
		sprites[0].setAnimation(TitleYoshiStill);
		frameCounter = 0;
	}
	sprites[0].draw(ctx);
	var start = new Image();
	start.src = "./Graphics/start.png"
	//ctx.drawImage(start, window.innerWidth/4, window.innerWidth/6, 366, 85);
	var exit = new Image();
	exit.src = "./Graphics/exit.png"
	//ctx.drawImage(exit, 0, 0, window.innerWidth/2.5, window.innerHeight*(window.innerHeight*(5/6)));
	var arrowImage = new Image();
	arrowImage.src = "./Graphics/arrow.png"
	frameCounter++;
}

var gameLoop = function ()
{
	clearCanvas();
	//ctx.drawImage(background, 0, 0, window.innerWidth, window.innerHeight);
	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	rainingBlocks();
	for(var i = sprites.length-1; i >= 0; i--)
	{
		//this.sprites[i].draw(ctx);
		if(i == 0)
		{
			//this.sprites[i].move(-2, 0);
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
					this.sprites[i].move(0, 10);
				}
			}
		}
	}
	titleScreen();
	requestAnimFrame(gameLoop, canvas);
}
	
	

