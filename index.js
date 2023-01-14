const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;
const gravity = 0.1;

let keys = {
	a: false,
	d: false
};


function Sprite(position, imageSrc){
    this.position = position;
    this.image = new Image();
    this.image.src = imageSrc;
    this.draw = function(){
     	c.beginPath();
       	c.drawImage(this.image, this.position.x, this.position.y);
       	c.closePath();
       
  };
}

function Obstacle(position){
	this.pos = position;
	this.radius = 12;
	this.vely = 0;
	this.draw = function(){
		c.beginPath();
		c.fillStyle = 'yellow';
		c.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI*2, true);
		c.fill();
		c.closePath();
	};
	/*this.update = function(){
		this.pos.y += this.vely;
		this.vely += gravity;
		if(collision(this, collisionBlockArray[27])){
			this.vely =- 6;
		
		}
		this.draw();
	}*/
	//to make it bounce
};
let obs1 = new Obstacle({x:368, y:300});
obs1.update = function(){
	this.pos.y += this.vely;
	this.vely += gravity;
	if(collision(this, collisionBlockArray[27])){
		this.vely =- 3;
	}
	this.draw();
}
let obs2 = new Obstacle({x:754, y: 172});
obs2.update = function(){
	this.pos.y += this.vely;
	this.vely += gravity;
	if(collision(this, collisionBlockArray[11])){
		this.vely =- 3;
	}
	this.draw();
}
let obstacleArray = [obs1, obs2];

 const bg_img = new Sprite({x:0, y:0},"Map.png");

//Test Blocks
//let block1 = new CollisionBlock(0, 200, canvas.width, 16);
//let block2 = new CollisionBlock(300, 0, 16, canvas.width);

//BlockArray
let collisionBlocks2D = [];
for(var i = 0; i < collisionBlocks.length; i+=64){
    collisionBlocks2D.push(collisionBlocks.slice(i, i+64));
}

let collisionBlockArray = [];
collisionBlocks2D.forEach((row, y) => {
                          row.forEach((symbol, x) => {
                                      if(symbol == 1){
                                        collisionBlockArray.push(new CollisionBlock(x*16, y*16));
                                      }

                                        })
                                      });


var camera = {
    x:0,
    y:canvas.height/2 - 576
};
function animate(){
	requestAnimationFrame(animate);
	c.clearRect(0, 0, canvas.width, canvas.height);
	c.save();
	c.scale(2,2);
	c.translate(camera.x, camera.y);
	bg_img.draw();
	Player.update();
	obs1.update();
	obs2.update();
	//console.log(Player.pos.y );
	c.restore();
}
animate();

function collision(obj1, obj2){
	const collided = ((obj1.pos.x + obj1.radius >= obj2.x) && (obj1.pos.x <= obj2.x + obj2.width) && (obj1.pos.y <= obj2.y + obj2.height)
		&& (obj1.pos.y + obj1.radius >= obj2.y));
	return collided;
}
function obsCollision(obj1, obj2){
	const collided = (((obj1.pos.x - obj2.pos.x)**2 + (obj1.pos.y - obj2.pos.y)**2)**0.5 < 24);
	return collided;
}
window.addEventListener('keydown', (event) => {
	const key = event.key;
	switch(key){
	case 'a':
		keys.a = true;
		break;
	case 'd':
		keys.d = true;
		break;
	case 'w':
		Player.vel.y = -4;
		break;
	}
});
window.addEventListener('keyup', (event) => {
	const key = event.key;
	switch(key){
	case 'a':
		keys.a = false;
		break;
	case 'd':
		keys.d = false;
		break;
	}
});