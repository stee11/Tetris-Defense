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

function clearCanvas()
{
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

var yoshiImage = new Image();
yoshiImage.src = "./Graphics/YoshiTest.png"
var yoshi = new Sprite(250, 400, 30, 48);
var runAnim = new Animation(yoshiImage, 0, 0, 30, 48, 12, 5);
yoshi.setAnimation(runAnim);

function gameLoop()
{
	yoshi.draw(ctx);
	clearCanvas();
	requestAnimFrame(gameLoop, canvas);
}
	
	

