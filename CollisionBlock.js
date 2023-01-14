function CollisionBlock(x, y){
    this.x = x;
    this.y = y;
    this.height = 16;
    this.width = 16;
    this.draw = function(){
        c.beginPath();
        c.fillStyle = "rgba(255, 0, 0, 0.5)";
        c.fillRect(this.x, this.y, this.width, this.height);
        c.closePath();
        };
    }
