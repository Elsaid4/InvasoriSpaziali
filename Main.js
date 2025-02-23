var width;
var height;

let PG;

let Bullets = [];
let Enemies = [];


let lastShotTime = 0; 
let shotDelay = 100;

let lastEnemiesMove = 0;
const moveDelay = 100;

let numEnemies = 0;
let alpha = 0;
let gameOver = false;

let start;
let godMode = false;

function setup() {
    width   = 500;
    height  = 600;
    createCanvas(width, height);

    PG = new Nave(width/2 - 30, height * 0.8, 60, 60, 5, loadImage('Images/Nave.png'));

    for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 5; j++) {
            Enemies.push(new Enemy( 15 + i * 70, 50 + j * 60, 50, 40, 4, 100, loadImage('Images/Alien.png')));
        }
    }
    
    
    // make button to start game
    start = createButton('Start Game');
    start.position(width/2 - 40, height/2 + 50);
    start.size(100, 50);
    start.mousePressed(() => {
        gameOver = false;
        PG.health = 100;
        for (let i = 0; i < 7; i++) {
            for (let j = 0; j < 5; j++) {
                Enemies.push(new Enemy( 15 + i * 70, 50 + j * 60, 50, 40, 4, 100, loadImage('Images/Alien.png')));
            }
        }
        start.hide();
    });
    start.hide();

    // make button to enable god mode
    let god = createButton('God Mode');
    god.position(width - 80, height - 30);
    god.size(80, 30);
    god.mousePressed(() => {
        godMode = !godMode;
        god.style('background-color', godMode ? 'red' : 'green');
    });
    god.style('background-color', 'green');


}

function draw() {
    background(0);

    if (gameOver){
        textSize(100);
        fill("red");
        text("Hai perso!", 10, height/2);
        start.show();
        return;
    }

    if (godMode){
        PG.health = 100;
        shotDelay = 10;
    }
    else{
        shotDelay = 200;
    }

    PG.show();
    fill("white");
    rect(10, height - 30, 180, 15);
    fill("red");
    rect(10, height - 30, PG.health * 1.8, 15);

    Bullets.forEach(bullet => {
        if (bullet.posY < 0 || bullet.posY > height) {
            Bullets.splice(Bullets.indexOf(bullet), 1);
            return;
        }

        if (bullet.isEnemy && collideRectRect(bullet.posX, bullet.posY, bullet.x, bullet.y, PG.posX, PG.posY, PG.x, PG.y)) {
            Bullets.splice(Bullets.indexOf(bullet), 1);
            PG.health -= 10;
            if (PG.health < 0){
                gameOver = true;
                Enemies = [];
                Bullets = [];
            }
            return;
        }

        if (!bullet.isEnemy) {
            Enemies.forEach(enemy => {
                if (collideRectRect(bullet.posX, bullet.posY, bullet.x, bullet.y, enemy.posX, enemy.posY, enemy.width, enemy.height)) {
                    Bullets.splice(Bullets.indexOf(bullet), 1);
                    enemy.health -= 10;
                    if (enemy.health < 0){
                        Enemies.splice(Enemies.indexOf(enemy), 1);
                        if (Enemies.length === 0){
                            print("Hai vinto!");
                        }
                    }
                }
            });
        }

        bullet.show();
        bullet.move();
    });

    let dirX = 0;
    let dirY = 0;
    if (millis() - lastEnemiesMove > moveDelay){
        dirX = Math.cos(alpha) ;
        dirX *= random(1) > 0.5 ? 1 : -1;
        dirY = Math.sin(alpha);
        dirY *= random(1) > 0.5 ? 1 : -1;
        lastEnemiesMove = millis();
    }

    Enemies.forEach(enemy => {
        enemy.speed = 50 / Enemies.length;
        enemy.show();

        if (!checkCollision(enemy, dirX, dirY)) {
            enemy.move(dirX, dirY);
        }
        enemy.move(dirX, dirY);
        if (random(1) < 0.005) {
            Bullets.push(enemy.shoot());
            if (enemy.health < 0){
                Enemies.splice(Enemies.indexOf(enemy), 1);
            }
        }
    });

    alpha += 0.0001;  
    alpha = alpha > 2 * Math.PI ? 0 : alpha;

    if (keyIsDown(LEFT_ARROW) || keyIsDown("A".charCodeAt(0))) {
        PG.move(-1, true, width, height);
    }
    if (keyIsDown(RIGHT_ARROW) || keyIsDown("D".charCodeAt(0))) {
        PG.move(1, true, width, height);
    }
    if (keyIsDown(UP_ARROW) || keyIsDown("W".charCodeAt(0))) {
        PG.move(-1, false, width, height);
    }
    if (keyIsDown(DOWN_ARROW) || keyIsDown("S".charCodeAt(0))) {
        PG.move(1, false, width, height);
    }

    if (keyIsDown(32) && millis() - lastShotTime > shotDelay) {
        Bullets.push(PG.shoot());
        lastShotTime = millis(); 
    }
}

function checkCollision(enemy, dirX, dirY) {
    for (let other of Enemies) {
        if (other !== enemy && collideRectRect(enemy.posX + dirX*enemy.speed, enemy.posY + dirY*enemy.speed, enemy.width, enemy.height, other.posX, other.posY, other.width, other.health)) {
            return true;
        }
    }
    return false;
}

function collideRectRect(x1, y1, w1, h1, x2, y2, w2, h2) {
    // Controlla se i bordi dei rettangoli si sovrappongono
    if (x1 < x2 + w2 &&
        x1 + w1 > x2 &&
        y1 < y2 + h2 &&
        y1 + h1 > y2) {
        return true;
    }
    // print("Collisione");
    return false;
}

function keyPressed() {

}

function mousePressed() {
}

function mouseReleased() {
}
