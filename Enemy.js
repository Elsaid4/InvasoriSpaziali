function Enemy(posX, posY, x, y, speed, img) {
    this.posX = posX;
    this.posY = posY;
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.img = img;

    this.show = function() {
        image(this.img, this.posX, this.posY, this.x, this.y);
    }

    this.move = function() {
        this.posY += this.speed;
    }

    this.shoot = function() {
        return new Bullet(this.posX + this.x/2, this.posY, 5, 10, 10, true);
    }

}