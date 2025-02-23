function Enemy(posX, posY, width, height, speed, health, img) {
    this.posX = posX;
    this.posY = posY;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.img = img;
    this.health = health;
    this.maxHealth = 100;

    this.show = function() {
        image(this.img, this.posX, this.posY, this.width, this.height);
        // let c = color(255, 255, 255);
        // c.setAlpha(50);
        // fill(c);
        // rect(this.posX, this.posY, this.width, this.height);
        fill("white");
        rect(this.posX, this.posY + 45, this.maxHealth/2, 5);
        fill("red");
        rect(this.posX, this.posY + 45, this.health/2, 5);
    }

    this.move = function(dirX, dirY) {
        if (this.posX + this.speed * dirX < 0 - this.width || this.posX + this.speed * dirX > 500 - this.width)
            return;
        if (this.posY + this.speed * dirY < 0 - this.height || this.posY + this.speed * dirY > 600 - this.height)
            return;
        this.posX += dirX * this.speed;
        this.posY += dirY * this.speed;
    }

    this.shoot = function() {
        return new Bullet(this.posX + this.width/2, this.posY, 5, 10, 10, true);
    }

}