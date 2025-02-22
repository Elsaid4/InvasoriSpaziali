function Bullet(posX, posY, x, y, speed, isEnemy){
    this.posX       = posX;
    this.posY       = posY;
    this.x          = x;
    this.y          = y;
    this.speed      = speed;
    this.isEnemy    = isEnemy;

    this.show = function(){
        fill(this.isEnemy ? "red" : "white");
        rect(this.posX, this.posY, this.x, this.y);
    }

    this.move = function(){
        this.posY = isEnemy ? this.posY + this.speed : this.posY - this.speed;
    }
}