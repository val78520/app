new p5();

let pillars = [];
let initialSpace = 900;
let bird;
let nbPillars = 100;
let pillardWidth = 175;
let isGameOver = false;
let zoomLevel = 0.5;
let nbPillarsClosed = 0;
let worldWidth = window.innerWidth;
let worldHeight = window.innerHeight;
let score = 0;
let input, button;
let img;
let logo;
let colors = ['#E30044', '#91002C', '#F4A2BB', '#273043','#898E98','#0F1219','#C62E5C','#C4C6CB','#770024'];
let myColor = random(colors);




function preload() {
  img = loadImage('assets/aiguille.png');
  logo = loadImage('assets/logo.jpg');
}

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
    showGameOver()
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
  image(logo,window.innerWidth/2-150,-100,300,300);
  textSize(42);
  fill(255);
  let myText = score + "€" ;
  text(myText, window.innerWidth/2, 120);
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
    this.myColor = random(colors);
    // this.color = color(random(255), random(255), random(255));
    this.bg = image(img);
  }
  drawPillar() {
    this.xPos -= 4;
    
    if (this.xPos + this.width <= bird.xPos) {
      if (!this.closing) nbPillarsClosed++;
      if (!this.closing) score++;
      this.closing = true;
    }
    fill(this.myColor);
    noStroke();
    
    if (this.closing && this.closingHeight <= this.spaceHeight / 2)
      this.closingHeight += 10;

    rect(this.xPos, 0, this.width, this.height + this.closingHeight,10);

    rect(
      this.xPos,this.height + this.spaceHeight - this.closingHeight,this.width,this.height + this.closingHeight,10);
    
  }
  drawPillarFullHeight() {
    fill(this.myColor);
    
    let computedWidth = min(200, worldWidth / nbPillarsClosed);
    rect(this.index * computedWidth, 0, computedWidth, worldHeight);
  }

}

class Bird {
  constructor() {
    this.xPos = window.innerWidth / 3;
    this.yPos = window.innerHeight / 2;
    this.ySpeed = -10;
  }
  drawBird() {
    stroke(200);
    strokeWeight(4);
    // noFill();
    // strokeWeight(2);
    // ellipse(this.xPos, this.yPos, 20, 20);
    let red = color(225,67,33);
    image(img,this.xPos-175/2,this.yPos-100/2, 175, 100);
    fill(red);
    line(this.xPos, this.yPos, 0, window.innerHeight/2);
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


function showGameOver() {
  noStroke();
  image(logo,window.innerWidth/2-150,-100,300,300);
  black = color(0,0,0,100);
  fill(black);
  let myText = score + "€" ;

  fill(black);
  rect(window.innerWidth/2-(worldWidth*0.8)/2, window.innerHeight/2-(worldHeight*0.6)/2, worldWidth*0.8, worldHeight*0.6, 20);
  fill(255);
  if (score==0)
  {
    textSize(30);
    text("Deuxième chance !",(window.innerWidth/2)-125, (window.innerHeight/10)*3);
    textSize(12);
    text("Changez l'usage, créez, démarquez",(window.innerWidth/2)-100, (window.innerHeight/20)*7);
    text("et responsabilisez :",(window.innerWidth/2)-50, (window.innerHeight/20)*7.4);
    text("Chaque instant passé à créer votre pièce",(window.innerWidth/2)-110, (window.innerHeight/20)*7.8);
    text("unique, vous reversez un don pour une association",(window.innerWidth/2)-135, (window.innerHeight/20)*8.2);
    fill(black);
    button = createButton('Rejouer');
    button.position((window.innerWidth/2)-120, (window.innerHeight/10)*5);
    button.style('border-radius', '5px');
    button.size(240,50);
    button.mouseClicked(lancer);
  }
  else {
    textSize(28);
    text("Bravo tu as récolté :",(window.innerWidth/2)-120, (window.innerHeight/10)*3);
    textSize(60);
    text(myText, (window.innerWidth/2)-40, (window.innerHeight/10)*3+70);
    textSize(12);
    text("Changez l'usage, créez, démarquez",(window.innerWidth/2)-100, (window.innerHeight/20)*9);
    text("et responsabilisez :",(window.innerWidth/2)-50, (window.innerHeight/20)*9.5);
    text("Chaque instant passé à créer votre pièce",(window.innerWidth/2)-110, (window.innerHeight/20)*10);
    text("unique, vous reversez un don pour une association",(window.innerWidth/2)-135, (window.innerHeight/20)*10.5);

    text("Voici votre création !",(window.innerWidth/2)-55, (window.innerHeight/20)*11);

    button = createButton('Rejouer');
    button2 = createButton('Partager');
    button.position((window.innerWidth/2)-120, (window.innerHeight/20)*14.2);
    button2.position((window.innerWidth/2)-120, (window.innerHeight/20)*12.3);
    button.style('border-radius', '5px');
    button2.style('border-radius', '5px');
    button.size(240,50);
    button2.size(240,50);
    button.mouseClicked(lancer);
  }
  

}
function lancer() {
  location.reload();
}
