/* If you're feeling fancy you can add interactivity 
    to your site with Javascript */

// prints "hi" in the browser's dev tools console
bird b = new bird();
pillar[] p = new pillar[3];
boolean end=false;
boolean intro=true;
int score=0;
void setup() {
  size(500, 800);
  for (int i = 0; i<3; i++) {
    p[i]=new pillar(i);
  }
}
void draw() {
  background(0);
  if (end) {
    b.move();
  }
  b.drawBird();
  if (end) {
    b.drag();
  }
  b.checkCollisions();
  for (int i = 0; i<3; i++) {
    p[i].drawPillar();
    p[i].checkPosition();
  }
  fill(0);
  stroke(255);
  textSize(32);
  if (end) {
    rect(225, 20, 100, 50, 35);
    fill(255);
    String myText = score + ” €” ;
    text(myText, 250, 58);
  } else {
    rect(150, 100, 200, 50);
    rect(125, 200, 250, 50);
    fill(255);
    if (intro) {
      text(“Singer game”, 155, 140);
      text(“Cliquer pour commencer”, 155, 240);
    } else {
      text(“GAME OVER”, 200, 140);
      text(“Ton don :“, 155, 240);
      String myText = score + “€” ;
      text(myText, 300, 240);
    }
  }
}
class bird {
  float xPos, yPos, ySpeed;
  bird() {
    xPos = 250;
    yPos = 400;
  }
  void drawBird() {
    stroke(255);
    noFill();
    strokeWeight(2);
    ellipse(xPos, yPos, 20, 20);
  }
  void jump() {
    ySpeed=-10;
  }
  void drag() {
    ySpeed+=0.4;
  }
  void move() {
    yPos+=ySpeed;
    for (int i = 0; i<3; i++) {
      p[i].xPos-=3;
    }
  }
  void checkCollisions() {
    if (yPos>800) {
      end=false;
    }
    for (int i = 0; i<3; i++) {
      if ((xPos<p[i].xPos+100&&xPos>p[i].xPos-10)&&(yPos<p[i].opening-150||yPos>p[i].opening+150)) {
        end=false;
      }
    }
  }
}
class pillar {
  float xPos, opening;
  boolean cashed = false;
  pillar(int i) {
    xPos = 100+(i*200);
    opening = random(600)+100;
  }
  void drawPillar() {
    color c = color(255, 204, 0);
    fill(c);
    rect(xPos, 0, 100, opening-150);
    rect(xPos, opening+150, 100, 800);
   // line(xPos, 0, xPos, opening-100);
    //line(xPos, opening+100, xPos, 800);
  }
  void checkPosition() {
    if (xPos<0) {
      xPos+=(200*3);
      opening = random(600)+100;
      cashed=false;
    }
    if (xPos<250&&cashed==false) {
      cashed=true;
      score++;
    }
  }
}
void reset() {
  end=true;
  score=0;
  b.yPos=400;
  for (int i = 0; i<3; i++) {
    p[i].xPos+=550;
    p[i].cashed = false;
  }
}
void mousePressed() {
  b.jump();
  intro=false;
  if (end==false) {
    reset();
  }
}
void keyPressed() {
  b.jump();
  intro=false;
  if (end==false) {
    reset();
  }
}
