var width;
var height;

let PG;

let Bullets = [];
let Enemies = [];


let lastShotTime = 0; // Aggiungi questa variabile
const shotDelay = 200; // Ritardo tra i colpi in millisecondi

function setup() {
    width   = 500;
    height  = 600;
    createCanvas(width, height);

    PG = new Nave(width/2 - 30, height * 0.8, 60, 60, 5, loadImage('Images/Nave.png'));

    for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 5; j++) {
            Enemies.push(new Enemy(50 + i * 55, 50 + j * 50, 50, 40, 2, loadImage('Images/Alien.png')));
        }
    }
}

function draw() {
    background(0);

    PG.show();

    Bullets.forEach(bullet => {
        if (bullet.posY < 0) {
            Bullets.splice(Bullets.indexOf(bullet), 1);
            return;
        }
        bullet.show();
        bullet.move();
    });

    Enemies.forEach(enemy => {
        enemy.show();
        // enemy.move();
        if (random(1) < 0.001) {
            Bullets.push(enemy.shoot());
        }
    });



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
    // Controlla se è trascorso abbastanza tempo per sparare di nuovo
    if (keyIsDown(32) && millis() - lastShotTime > shotDelay) {
        Bullets.push(PG.shoot());
        lastShotTime = millis(); // Aggiorna il tempo dell'ultimo sparo
    }
}

function keyPressed() {

}

function mousePressed() {
}

function mouseReleased() {
}
