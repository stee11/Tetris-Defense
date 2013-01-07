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
	
	Animation.prototype.draw = function(ctx, x, y, w, h)
	{
		this.x1 = currentFrame * frameW;
		this.y1 = startY;
		ctx.drawImage(this.image, this.x1, this.y1, this.frameW, this.frameH, x, y, w, h); 
		this.frameCounter = this.frameCounter + 1;
		console.log(this.frameCoutner + " " + this.frameRate);
		
		if(this.frameCounter % this.frameRate == 0)
		{
			console.log("Here.");
			this.currentFrame++;
			if(currentFrame > this.frameNum)
			{
				this.currentFrame = 0;
			}
			this.frameCounter = 0;
		}
	}
}
