// bad guys
class baddies {
  // the meaning of life as a baddie
  constructor(badguyRace, badguySkill, x, y, playerSpeed) {
    // race and skill
    this.race = badguyRace;
    this.skill = badguySkill;

    // position to player
    this.otherX = x;
    this.otherY = y;

    // postion on map
    this.x = x;
    this.y = y;

    // movement vars
    this.playerSpeed = playerSpeed;
    this.speed = 10; // temp
    this.state = 0;
    this.dir = 0;

    this.UP = 0;
    this.RIGHT = 1;
    this.DOWN = 2;
    this.LEFT = 3;

    this.TIME_TO_STEP = 200;
    this.lastTime = 0;
  }

  // AI
  movement(worldW, worldH, spriteW, spriteH) {
    // move forword
    if (this.state === 0 || this.state === 1) {
      if (this.dir === this.UP) {
        this.y -= this.speed;
        this.otherY -= this.speed;
      }

      else if (this.dir === this.RIGHT) {
        this.x += this.speed;
        this.otherX += this.speed;
      }

      else if (this.dir === this.DOWN) {
        this.y += this.speed;
        this.otherY += this.speed;
      }

      else if (this.dir === this.LEFT) {
        this.x -= this.speed;
        this.otherX -= this.speed;
      }
    }

    // boundries
    let boundX = worldW/2 - spriteW/2;
    let boundY = worldH/2 - spriteH/2;

    this.x = constrain(this.x, -boundX, boundX);
    this.otherX = constrain(this.otherX, -boundX, boundX);
    this.y = constrain(this.y, -boundY, boundY);
    this.otherY = constrain(this.otherY, -boundY, boundY);


    // turn right
    if (this.state === 0) {
      this.dir++;
      if (this.dir > this.LEFT) {
        this.dir = this.UP;
      }
      this.state = 2;
    }

    // turn left
    else if (this.state === 1) {
      this.dir--;
      if (this.dir < this.UP) {
        this.dir = this.LEFT;
      }
      this.state = 2;
    }

    // waiting
    else if (this.state === 2) {
      let elapsedTime = millis() - this.TIME_TO_STEP;
      if (elapsedTime >= this.lastTime) {
        this.state = random([0, 1]);
        this.lastTime = millis();
      }
    }
  }

  // AI pursue player
  attackPlayer(playerX, playerY, worldW, worldH) {
    // move toward player
    if (this.state === 0 || this.state === 1) {
      // x-axis
      if (this.x >= playerX - worldW/2) {
        this.x -= this.speed*2;
        this.otherX -= this.speed*2;
      }

      else if (this.x <= playerX - worldW/2) {
        this.x += this.speed*2;
        this.otherX += this.speed*2;
      }

      // y-axis
      if (this.y >= playerY - worldH/2) {
        this.y -= this.speed*2;
        this.otherY -= this.speed*2;
      }

      else if (this.y <= playerY - worldH/2) {
        this.y += this.speed*2;
        this.otherY += this.speed*2;
      }
      this.state = 2;
    }

    // waiting
    else if (this.state === 2) {
      let elapsedTime = millis() - this.TIME_TO_STEP/2;
      if (elapsedTime >= this.lastTime) {
        this.state = random([0, 1]);
        this.lastTime = millis();
      }
    }
  }

  // baddie on screen?
  baddieOnScreen(playerX, playerY, worldW, worldH) {
    return this.x >= playerX - worldW/2 - width/2 && this.x <= playerX - worldW/2 + width/2 &&
           this.y >= playerY - worldH/2 - height/2 && this.y <= playerY - worldH/2 + height/2;
  }

  // hitting player
  collision(spriteW, spriteH) {
    return this.otherX + width/2 > width/2 - spriteW/2 && this.otherX + width/2 < width/2 + spriteW/2
      && this.otherY + height/2 > height/2 - spriteH/2 && this.otherY + height/2 < height/2 + spriteH/2;
  }

  // move with player X
  moveWithPlayerX(worldW) {
    // x-axis
    if (keyIsDown(65)) { // a
      this.otherX += this.playerSpeed;
    }

    if (keyIsDown(68)) { // d
      this.otherX -= this.playerSpeed;
    }
  }

  // move with player Y
  moveWithPlayerY(worldH) {
    // y-axis
    if (keyIsDown(87)) { // w
      this.otherY += this.playerSpeed;
    }

    if (keyIsDown(83)) { // s
      this.otherY -= this.playerSpeed;
    }
  }

  // mapping baddies
  mapping(
    worldW, worldH,
    minimapX, minimapY,
    minimapW, minimapH,
    dotSize) {
    // minimap boundries
    let minimapXMin = minimapX - minimapW/2 + dotSize/2;
    let minimapXMax = minimapX + minimapW/2 - dotSize/2;

    let minimapYMin = minimapY - minimapH/2 + dotSize/2;
    let minimapYMax = minimapY + minimapH/2 - dotSize/2;

    // mapping dot
    let mapX = map(this.x, -worldW/2, worldW/2, minimapXMin, minimapXMax);
    let mapY = map(this.y, -worldH/2, worldH/2, minimapYMin, minimapYMax);

    // baddie dot
    fill("red");
    ellipse(mapX, mapY, dotSize);
  }

  // showing race and class
  show(sizeX, sizeY) {
    image(this.race[1], this.otherX + width/2, this.otherY + height/2, sizeX, sizeY);
    image(this.skill[1], this.otherX + width/2, this.otherY + height/2 - sizeY, sizeX, sizeY);
  }
}
