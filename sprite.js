function Sprite(x, y, w, h)
{
	//x cor, y cor, width, height
	var x, y, w, h;
	//each sprite has a current animation
	var currentAnimation;
	
	//assisgn local vars
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	
	Sprite.prototype.getX = function()
	{
		return this.x;
	}
	
	Sprite.prototype.getY = function()
	{
		return this.y;
	}
	
	//at each frame, every sprite's draw function will be called.
	Sprite.prototype.draw = function(ctx)
	{
		this.currentAnimation.draw(ctx, this.x, this.y, this.w, this.h);
	}
	
	//sets the current animation
	Sprite.prototype.setAnimation = function(animationName)
	{
		this.currentAnimation = animationName;
	}
	
	Sprite.prototype.move = function(offx, offy)
	{
		this.x+=offx;
		this.y+=offy;
		if(this.x < -30)
		{
			this.x = window.innerWidth;
		}
	}	
	
}

function Animation(image, startX, startY, frameW, frameH, frameNum, frameRate)
{
	//the image set that the animation belongs to
	var image;
	//the starting x, y cors and width, height of the animation on the image
	var startX, startY, frameW, frameH, frameNum;
	//the number of frames that elapse before moving to the next animation step
	var frameRate;
	//the number of frames that have elapsed
	var frameCounter = 0;
	var currentFrame = 0;
	var x1 = y1 = 0;
	
	this.image = image;
	this.startX = startX;
	this.startY = startY;
	this.frameW = frameW;
	this.frameH = frameH;
	this.frameNum = frameNum;
	this.frameRate = frameRate;
	
	this.draw = function(ctx, x, y, w, h)
	{	
		x1 = currentFrame * frameW;
		y1 = startY;
		ctx.drawImage(image, x1, y1, frameW, frameH, x, y, w, h); 
		frameCounter++;
				
		if(frameCounter > frameRate)
		{
			currentFrame++;
			if(currentFrame >= frameNum)
			{
				currentFrame = 0;
			}
			frameCounter = 0;
		}
	}
}
