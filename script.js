let pillars = [];
let initialSpace = 900;
let bird;
let nbPillars = 100;
let pillardWidth = 200;
let isGameOver = false;
let zoomLevel = 0.5;
let nbPillarsClosed = 0;
let worldWidth = window.innerWidth;
let worldHeight = window.innerHeight;

function setup() {
  createCanvas(worldWidth, worldHeight);
  for (i = 0; i < nbPillars; i++) {
    p = new Pillar(i);
    pillars.push(p);
  }
  bird = new Bird();
}

function draw() {
  background(220);
  if (isGameOver) {
    for (i = 0; i < nbPillarsClosed; i++) {
      pillars[i].drawPillarFullHeight();
    }
    return;
  }
  for (i = 0; i < nbPillars; i++) {
    pillars[i].drawPillar();
  }

  bird.drawBird();
  bird.move();
  bird.drag();
  if (bird.isOut()) gameOver();
  if (bird.isCollision()) gameOver();
}

class Pillar {
  constructor(i) {
    this.spaceHeight = 250;
    this.height = random(0.3 * window.innerHeight, 0.4 * window.innerHeight);
    this.width = pillardWidth;
    this.xPos = initialSpace + i * this.width;
    this.index = i;
    this.yPos = 100;
    this.closing = false;
    this.closingHeight = 0;
    this.color = color(random(255), random(255), random(255));
  }
  drawPillar() {
    this.xPos -= 4;
    if (this.xPos + this.width <= bird.xPos) {
      if (!this.closing) nbPillarsClosed++;
      this.closing = true;
    }
    fill(this.color);

    if (this.closing && this.closingHeight <= this.spaceHeight / 2)
      this.closingHeight += 10;

    rect(this.xPos, 0, this.width, this.height + this.closingHeight);

    rect(
      this.xPos,
      this.height + this.spaceHeight - this.closingHeight,
      this.width,
      this.height + this.closingHeight
    );
  }
  drawPillarFullHeight() {
    fill(this.color);

    let computedWidth = min(200, worldWidth / nbPillarsClosed);
    rect(this.index * computedWidth, 0, computedWidth, worldHeight);
  }
}

class Bird {
  constructor() {
    this.xPos = window.innerHeight / 5;
    this.yPos = window.innerHeight / 2;
    this.ySpeed = -10;
  }
  drawBird() {
    stroke(255);
    noFill();
    strokeWeight(2);
    ellipse(this.xPos, this.yPos, 20, 20);
  }
  jump() {
    this.ySpeed = -10;
  }
  drag() {
    this.ySpeed += 0.4;
  }
  move() {
    this.yPos += this.ySpeed;
  }
  isCollision() {
    for (i = 0; i < nbPillars; i++) {
      if (
        this.xPos >= pillars[i].xPos &&
        this.xPos <= pillars[i].xPos + pillars[i].width &&
        this.yPos >= 0 &&
        (this.yPos <= pillars[i].height ||
          this.yPos >= pillars[i].height + pillars[i].spaceHeight)
      )
        return true;
    }
  }
  isOut() {
    return bird.yPos >= worldHeight;
  }
}

function mousePressed() {
  bird.jump();
}

function keyPressed() {
  bird.jump();
}

function gameOver() {
  isGameOver = true;
}

