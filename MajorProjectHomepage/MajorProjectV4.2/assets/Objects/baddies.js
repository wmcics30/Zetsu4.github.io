// bad guys
class Baddies {
  constructor(badguyRace, badguySkill, x, y, enviormentLvlMin, enviormentLvlMax, movedX = 0, movedY = 0) {
    // race and skill
    this.race = badguyRace;
    this.skill = badguySkill;

    // stats
    this.lvl = int(random(enviormentLvlMin, enviormentLvlMax));
    this.expGained = (this.race[2].expGained+this.skill[2].expGained)*this.lvl;
    this.int;
    this.agi;
    this.str;
    this.dex;
    this.vit;

    this.totHP;
    this.totMP;
    this.hp;
    this.mp;

    this.mDmg; // melee damage
    this.rDmg; // ranged damage
    this.sDmg; // magic damage

    this.attackPattern;
    this.lastAttack = 0;
    this.attacking = false;
    this.attackEntety = [];

    // position in world
    this.movedX = movedX;
    this.movedY = movedY;

    this.otherX = x + movedX;
    this.otherY = y + movedY;

    // postion on map
    this.x = x;
    this.y = y;

    // movement vars
    this.stuned = false;
    this.speed;
    this.state = 0;
    this.dir = 0;

    this.UP = 0;
    this.RIGHT = 1;
    this.DOWN = 2;
    this.LEFT = 3;

    this.timeToStep = 300;
    this.lastTime = 0;
  }

  setStats() {
    let extraPoints = (this.lvl-1)*5;
    // stats
    this.int = this.race[2].int + ceil(extraPoints/5);
    this.agi = this.race[2].agi + ceil(extraPoints/5);
    this.str = this.race[2].str + ceil(extraPoints/5);
    this.dex = this.race[2].dex + ceil(extraPoints/5);
    this.vit = this.race[2].vit + ceil(extraPoints/5);

    // damage and health
    this.totHP = 10*(this.vit+1);
    this.totMP = 10*(this.int+1);
    this.hp = this.totHP;
    this.mp = this.totMP;
    this.mDmg = ceil(this.str*(2 - this.skill[2].melee/75)); // melee damage
    this.rDmg = ceil(this.dex*(2 - this.skill[2].ranged/75)); // ranged damage
    this.sDmg = ceil(this.int*(2 - this.skill[2].magic/75)); // spell damage

    this.speed = width*0.0075 + width*this.agi*pow(10, -4);
    this.timeToStep = 3000/(this.agi);

    // settings attack pattern
    if (max(this.mDmg, this.rDmg, this.sDmg) === this.sDmg) {
      // magic attack
      this.attackPattern = FireBall;
    }

    else if (max(this.mDmg, this.rDmg, this.sDmg) === this.rDmg) {
      // ranged attack
      this.attackPattern = Arrow;
    }

    else {
      // melee attack
      this.attackPattern = Sword;
    }

  }

  takeDamage(dmg, trapped = false) {
    this.hp -= dmg;
    this.stuned = true;
    if (trapped) {
      this.speed -= this.speed/4;
    }
  }

  stunedFoo() {
    // stuned
    if (this.stuned) {
      let elapsedTime = millis() - this.timeToStep*1.5;
      if (elapsedTime >= this.lastTime) {
        this.state = random([0, 1]);
        this.stuned = false;
        this.lastTime = millis();
      }
    }
  }

  // AI
  movement(worldW, worldH, spriteW, spriteH, playerX, playerY) {
    // move forword
    if (this.state === 0 || this.state === 1) {
      if (this.dir === this.UP && this.y > -worldH/2 + spriteH) {
        this.y -= this.speed;
        this.otherY -= this.speed;
      }

      else if (this.dir === this.RIGHT && this.x < worldW/2 - spriteW) {
        this.x += this.speed;
        this.otherX += this.speed;
      }

      else if (this.dir === this.DOWN && this.y < worldH/2 - spriteH) {
        this.y += this.speed;
        this.otherY += this.speed;
      }

      else if (this.dir === this.LEFT && this.x > -worldW/2 + spriteW) {
        this.x -= this.speed;
        this.otherX -= this.speed;
      }
    }

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
      let elapsedTime = millis() - this.timeToStep;
      if (elapsedTime >= this.lastTime) {
        this.state = random([0, 1]);
        this.lastTime = millis();
      }
    }
  }

  pursuePlayer(playerX, playerY, worldW, worldH) {
    // pursue player
    if (this.state !== 2 && !this.stuned) {
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
    else if (!this.stuned) {
      let elapsedTime = millis() - this.timeToStep/2;
      if (elapsedTime >= this.lastTime) {
        this.state = random([0, 1]);
        this.lastTime = millis();
      }
    }
  }

  attackPlayer() {
    if (!this.attacking) {
      let elapsedTime = millis() - this.timeToStep/2;
      if (elapsedTime >= this.lastAttack) {
        this.attacking = true;
        this.lastAttack = millis();
      }
    }

    // else if (this.attackPattern === "magic") {
    //   // spell caster
    //
    // }
    //
    // else if (this.attackPattern === "ranged") {
    //   // bowman
    //
    // }
    //
    // else if (this.attackPattern === "melee") {
    //   // swrodsman
    //
    // }
  }

  baddieOnScreen(playerX, playerY, worldW, worldH) {
    // baddie on screen?
    return this.x >= playerX - worldW/2 - width/2 && this.x <= playerX - worldW/2 + width/2 &&
           this.y >= playerY - worldH/2 - height/2 && this.y <= playerY - worldH/2 + height/2;
    // return this.x >= -worldW/2 - width/2 && this.x <= -worldW/2 + width/2 &&
    //        this.y >= -worldH/2 - height/2 && this.y <= -worldH/2 + height/2;
  }

  collision(spriteW, spriteH) {
    // hitting player?
    return this.otherX + width/2 > width/2 - spriteW/2 && this.otherX + width/2 < width/2 + spriteW/2
      && this.otherY + height/2 > height/2 - spriteH/2 && this.otherY + height/2 < height/2 + spriteH/2;
  }

  moveWithPlayerX(keyLeft, keyRight, playerSpeed) {
    // x-axis move with player
    if (keyIsDown(keyLeft)) { // LEFT
      this.otherX += playerSpeed;
    }

    if (keyIsDown(keyRight)) { // RIGHT
      this.otherX -= playerSpeed;
    }
  }

  moveWithPlayerY(keyUp, keyDown, playerSpeed) {
    // y-axis move with player
    if (keyIsDown(keyUp)) { // UP
      this.otherY += playerSpeed;
    }

    if (keyIsDown(keyDown)) { // DOWN
      this.otherY -= playerSpeed;
    }
  }

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

    // dot
    let mapX = map(this.x, -worldW/2, worldW/2, minimapXMin, minimapXMax);
    let mapY = map(this.y, -worldH/2, worldH/2, minimapYMin, minimapYMax);

    // baddie dot
    fill("red");
    ellipse(mapX, mapY, dotSize);
  }

  show(sizeX, sizeY, textTop) {
    image(this.race[1], this.otherX + width/2, this.otherY + height/2, sizeX, sizeY);
    image(this.skill[1], this.otherX + width/2, this.otherY + height/2 - sizeY, sizeX, sizeY);

    push();
    textSize(textTop/2);
    fill("white");
    text("Lv. " + this.lvl, this.otherX + width/2, this.otherY + height/2 - sizeY*0.65);
    pop();

    // HEALTH
    // health bar vars
    let x = this.otherX + width/2;
    let y = this.otherY + height/2 + sizeY;
    let w = sizeX;
    let h = sizeY/4;

    // health bar
    fill(77);
    rect(x, y, w, h);

    // HP
    push();
    let currentHP = this.totHP - this.hp;
    let changeOfHP = map(currentHP, 0, this.totHP, 0, sprite.WIDTH);

    rectMode(CORNER);
    fill("red");
    rect(x - w/2, y - h/2, w - changeOfHP, h);

    // outline
    rectMode(CENTER);
    noFill();
    strokeWeight(2);
    stroke("silver");
    rect(x, y, w, h);
    textSize(textTop/2);
    textAlign(CENTER, CENTER);
    noStroke();
    fill("white");
    text(this.hp, x, y)
    pop();
  }
}
