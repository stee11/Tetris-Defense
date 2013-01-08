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
//var canvasWidth = window.innerWidth-25;
//var canvasHeight = window.innerHeight-25;
canvas.setAttribute("width", window.innerWidth-25);
canvas.setAttribute("height", window.innerHeight-25);			
var ctx = canvas.getContext('2d');
//canvas.style.width = window.innerWidth;
//cavas.style.height = window.innerHeight;		
		
var clearCanvas = function()
{
	ctx.save();
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.restore();
}

background = new Image();
background.src = "./Graphics/Background.jpg"
//background.style.width = '100%'
//background.style.height = '100%'

var sprites = [];

var init = function()
{	
	var bgm = new Audio("Sound/bgm.mp3");
	bgm.loop = true;
	bgm.play();

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
	
	//The sprites get pushed into an array
	sprites.push(yoshi);
	sprites.push(trickman);
	sprites.push(oreo);

	
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

var gameLoop = function ()
{
	clearCanvas();
	ctx.drawImage(background, 0, 0, window.innerWidth, window.innerHeight);
	rainingBlocks();
	for(var i = sprites.length-1; i >= 0; i--)
	{
		this.sprites[i].draw(ctx);
		if(i == 0)
		{
			this.sprites[i].move(-2, 0);
		}
		else
		{
			if(i > 2)
			{
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
	requestAnimFrame(gameLoop, canvas);
}
	
	

