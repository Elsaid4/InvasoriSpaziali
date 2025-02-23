function Nave(posX, posY, x, y, speed, img) {
    this.posX   = posX;
    this.posY   = posY;
    this.x      = x;
    this.y      = y;
    this.speed  = speed;
    this.img    = img;
    this.health = 100;


    this.show = function() {
        image(this.img, this.posX, this.posY, this.x, this.y);

    }

    this.move = function(dir, isX, width, height) {
        if ((isX && (this.posX + dir * this.speed < 0 || this.posX + dir * this.speed > width - this.x)) || 
            (!isX && (this.posY + dir * this.speed < 400 || this.posY + dir * this.speed > height - this.y))) {
            return;
        }

        if (isX){
            this.posX += dir * this.speed;
        }
        else{
            this.posY += dir * this.speed
        }
    }

    this.shoot = function() {
        return new Bullet(this.posX + this.x/2, this.posY, 5, 10, 10, false);
    }   
}