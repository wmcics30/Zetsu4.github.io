// Enemy Attacks
// Travis Ahern
// Nov. 13, 1018

let circleSize = 30;
let numOfThings = 5;
let things = [];

class sword {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;

    this.size = size;
    // this.rotate = atan2(this.y - height/2, this.x - width/2);
    this.rotate = atan2(height/2 - this.y, width/2 - this.x);

    this.rotateing = random([true, false]);
  }

  destroy() {
    return this.x < width/2 + this.size*2 && this.x > width/2 - this.size*2 &&
    this.y < height/2 + this.size*2 && this.y > height/2 - this.size*2;
  }

  move() {
    if (this.x > width/2 + this.size) {
      this.x -= 2;
    }

    if (this.x < width/2 - this.size) {
      this.x += 2;
    }

    if (this.y > height/2 + this.size) {
      this.y -= 2;
    }

    if (this.y < height/2 - this.size) {
      this.y += 2;
    }
  }

  show() {
    push();
    if (this.rotateing) {
      fill("green");
      translate(this.x, this.y);
      rotate(this.rotate);
      rect(0, 0, this.size/2, this.size*2);
    }
    else {
      rect(this.x, this.y, this.size/2, this.size*2);
    }
    pop();
  }
}

class badGuy {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;

    this.size = size;
    this.aSword = [];

    this.timer = 1000;
    this.otherTime = millis();
    this.state = 1;
  }

  move() {
    if (this.x > width/2 + this.size*2) {
      this.x -= 0.5;
    }

    if (this.x < width/2 - this.size*2) {
      this.x += 0.5;
    }

    if (this.y > height/2 + this.size*2) {
      this.y -= 0.5;
    }

    if (this.y < height/2 - this.size*2) {
      this.y += 0.5;
    }
  }

  attack() {
    if (this.state === 1) {
      this.aSword.push(new sword(this.x, this.y, this.size));
      this.state = 0;
    }

    else {
      let elapsedTime = millis() - this.otherTime;
      if (elapsedTime > this.timer) {
        this.state = 1;
        this.otherTime = millis();
      }
    }
  }

  show() {
    rect(this.x, this.y, this.size, this.size);
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  // rectMode(CENTER);
}

function draw() {
  background(0);
  centerScreen();
  badGuyMovement();
}

function badGuyMovement() {
  for (let i = 0; i < things.length; i++) {
    // things[i].move();
    things[i].attack();
    things[i].show();
    for (let j = things[i].aSword.length-1; j >= 0; j--) {
      things[i].aSword[j].move();
      things[i].aSword[j].show();
      if (things[i].aSword[j].destroy()) {
        things[i].aSword.splice(j, 1);
      }
    }
  }
}

function centerScreen() {
  ellipse(width/2, height/2, circleSize);
}

function mousePressed() {

  things.push(new badGuy(mouseX, mouseY, circleSize));
}
