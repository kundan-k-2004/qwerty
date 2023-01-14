let Player = {
	pos:{
		x:10,
		y:480
	},
	vel:{
		x:0,
		y:0
	},
	cameraBox: {
    x: undefined,
    y: undefined,
    width: 240,
    height: 80
    },
	radius: 12,
	checkObstacleCollision: function(){
		for(let i = 0; i < 2; i++){
			if(obsCollision(this, obstacleArray[i])){
				window.alert("YOU LOSE :(");
				window.history.back();

			}
		}
	},
	updateCameraBox : function(){
    	this.cameraBox.x = this.pos.x-80;
	    this.cameraBox.y = this.pos.y-30;
    },
    shouldPanCameraLeft : function(){
        if(this.cameraBox.x + this.cameraBox.width >= 1024) return;
        let cameraRightSide = this.cameraBox.x + this.cameraBox.width;
        if(cameraRightSide >= canvas.width/2 + Math.abs(camera.x)){
            camera.x -= this.vel.x;
        }
    },
    shouldPanCameraRight : function(){
        if(this.cameraBox.x <=0) return;
        let cameraLeftSide = this.cameraBox.x;
        if(cameraLeftSide <= Math.abs(camera.x)){
            camera.x -= this.vel.x;
        }
    },
    shouldPanCameraDown : function(){
        if(this.cameraBox.y + this.vel.y <=0) return;
        let cameraTop = this.cameraBox.y;
        if(cameraTop <= Math.abs(camera.y)){
            camera.y -= this.vel.y;
        }
    },
    shouldPanCameraTop : function(){
       if(this.cameraBox.y + this.vel.y >= 576){
       	window.alert("YOU LOSE :(");
       	window.history.back();
       	return;
      }
        var cameraBottom = this.cameraBox.y + this.cameraBox.height;
        if(cameraBottom >= canvas.height/2 + Math.abs(camera.y)){
            camera.y -= this.vel.y;
        }
    },
	draw: function(){
		c.beginPath();
		c.fillStyle = "red";
		c.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI*2, true);
		c.fill();
		c.closePath();
	},
	update: function(){
		this.checkWin();
		this.checkObstacleCollision();
		if(keys.a){
			this.vel.x = -2;
		}
		else if(keys.d){
			this.vel.x = 2;
		}
		else{
			this.vel.x = 0;
		}

		if((this.pos.x + this.radius + this.vel.x >= 1024) || (this.pos.x - this.radius + this.vel.x <= -2)) this.vel.x = 0;

		this.pos.x += this.vel.x;
		this.checkForHorizontalCollisions();
        this.applyGravity();
        this.checkForVerticalCollisions();
        this.draw();
        if(this.vel.x > 0)this.shouldPanCameraLeft();
        if(this.vel.x < 0)this.shouldPanCameraRight();
        if(this.vel.y < 0) this.shouldPanCameraDown();
        if(this.vel.y > 0) this.shouldPanCameraTop();
        this.updateCameraBox();

	},
	checkWin: function(){
		if(this.pos.x >= 1000 && this.pos.y <= 166){
			window.alert("You WON!!");
			window.history.back();
		}
	},

	checkForVerticalCollisions: function(){
		for(let i = 0; i < collisionBlockArray.length; i++){
			if(collision(this,collisionBlockArray[i])){
				if(this.vel.y > 0){
					this.vel.y = 0;
					this.pos.y = collisionBlockArray[i].y - this.radius - 0.01;
				}
				else if (this.vel.y < 0){
					this.vel.y = 0;
					this.pos.y = collisionBlockArray[i].y + collisionBlockArray[i].height + 0.01;
				}
				return;
			}
		}
	},
	checkForHorizontalCollisions: function(){
		for(let i = 0; i < collisionBlockArray.length; i++){
			if(collision(this,collisionBlockArray[i])){
				if(this.vel.x > 0){
					this.vel.x = 0;
					this.pos.x = collisionBlockArray[i].x - this.radius - 0.01;
				}
				else if (this.vel.x < 0){
					this.vel.x = 0;
					this.pos.x = collisionBlockArray[i].x + collisionBlockArray[i].width + 0.01;
				}
				return;
			}
		}
	},
	applyGravity: function(){
		this.pos.y += this.vel.y;
		this.vel.y += gravity;
	}
};