//------------------------------------------------------------------------------
//  PLAYING THE GAME, startingState 3            START
//------------------------------------------------------------------------------

// BACKGROUND------
function scrollingBackground() {
  image(world.image, world.imageX + width/2, world.imageY + height/2, world.WIDTH, world.HEIGHT);
}

// MINIMAP---------
function showMinimap() {
  // outter map
  fill("gold");
  rect(minimap.X, minimap.Y, minimap.OUTTER_WIDTH, minimap.OUTTER_HEIGHT);

  // inner map
  image(world.image, minimap.X, minimap.Y, minimap.WIDTH, minimap.HEIGHT);
}

// PLAYER----------
function playerShow() {
  image(player.raceImage, width/2, height/2, sprite.WIDTH, sprite.HEIGHT);
  image(player.skillImage, width/2, height/2 - sprite.HEIGHT, sprite.WIDTH, sprite.HEIGHT);
  playerStatus(player.hp, player.totHP, "red", false);
  playerStatus(player.mp, player.totMP, "blue", true);
  playerLvL();
}

function playerStatus(state, stateTot, col, changeY) {
  // constant bar vars
  let x = width/2;
  let y = height/2 + sprite.HEIGHT;
  let w = sprite.WIDTH*2;
  let h = sprite.HEIGHT/4;

  if (changeY) {
    y += sprite.HEIGHT*0.5;
  }

  // back bar
  fill(77);
  rect(x, y, w, h);

  // current bar
  push();
  let currentState = stateTot - state;
  let changeOfState = map(currentState, 0, stateTot, 0, w);

  rectMode(CORNER);
  fill(col);
  rect(x - w/2, y - h/2, w - changeOfState, h);

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
  text(state + "/" + stateTot, x, y);
  pop();
}

function playerLvL() {
  push();
  fill("black");
  rect(width/2, height*0.975, width*0.10, height*0.05);

  textSize(textTop/2);
  textAlign(CENTER, CENTER);
  fill("white");
  text("Exp. " + player.exp + "/" + nextLvl, width/2, height*0.975);
  text("Lv. " + player.lvl, width/2, height/2 - sprite.HEIGHT*0.65);
  pop();
}

function playerLevelUp() {
  if (player.exp >= nextLvl) {
    player.lvl++;
    player.points += 5;
    nextLvl = nextLvl*2 + player.lvl*50;
  }

  if (player.points > 0) {
    push();
    textAlign(CENTER, CENTER);
    textSize(textTop*2);
    fill("yellow");
    text("!", width/2 - width*0.06, height*0.974);
    pop();
  }
}

function playerInvincability() {
  if (player.invincable) {
    elapsedTime = millis() - player.invincableTime;
    if (elapsedTime >= lastTimeHit) {
      player.invincable = false;
    }
  }
}

function consumeHealthPotion() {
  if (numOfHpPotions > 0) {
    numOfHpPotions--;
    player.hp += 50;
    if (player.hp > player.totHP) {
      player.hp = player.totHP;
    }
  }
}

function consumeManaPotion() {
  if (numOfMpPotions > 0) {
    numOfMpPotions--;
    player.mp += 50;
    if (player.mp > player.totMP) {
      player.mp = player.totMP;
    }
  }
}

function autoPotion() {
  if (player.mp <= 0 && numOfMpPotions > 0) {
    consumeManaPotion();
  }
}

function playerMovement() {
  player.speed = player.toggleWalk ? player.totSpeed*player.walk : player.totSpeed;

  // x-axis
  if (keyIsDown(keyBindings.get("keyArray")[4][1])) { // LEFT
    player.x -= player.speed;
    player.movedX -= player.speed;
    world.imageX += player.speed;
  }

  if (keyIsDown(keyBindings.get("keyArray")[6][1])) { // RIGHT
    player.x += player.speed;
    player.movedX += player.speed;
    world.imageX -= player.speed;
  }

  // y-axis
  if (keyIsDown(keyBindings.get("keyArray")[3][1])) { // UP
    player.y -= player.speed;
    player.movedY -= player.speed;
    world.imageY += player.speed;
  }

  if (keyIsDown(keyBindings.get("keyArray")[5][1])) { // DOWN
    player.y += player.speed;
    player.movedY += player.speed;
    world.imageY -= player.speed;
  }
  moveWithPlayer();
}

function moveWithPlayer() {
  // objects moving with player
  // x-axis
  if (player.x < 0 || player.x > world.WIDTH) {
    // staying in enviorment
    player.x = constrain(player.x, 0, world.WIDTH);
    world.imageX = constrain(world.imageX, -world.WIDTH/2 + sprite.WIDTH/2, world.WIDTH/2 - sprite.WIDTH/2);
  }

  else {
    // LEFT/RIGHT
    for (let badGuy of badGuys) { // baddies
      badGuy.moveWithPlayerX(keyBindings.get("keyArray")[4][1], keyBindings.get("keyArray")[6][1], player.speed);
    }

    for (let trap of objects.traps) { // traps
      trap.moveWithPlayerX(keyBindings.get("keyArray")[4][1], keyBindings.get("keyArray")[6][1], player.speed);
    }

    for (let magics of objects.magic) { // magic
      magics.moveWithPlayerX(keyBindings.get("keyArray")[4][1], keyBindings.get("keyArray")[6][1], player.speed);
    }

    for (let arrow of objects.arrows) { // arrows
      arrow.moveWithPlayerX(keyBindings.get("keyArray")[4][1], keyBindings.get("keyArray")[6][1], player.speed);
    }

    for (let slash of objects.melee) { // slashes
      slash.moveWithPlayerX(keyBindings.get("keyArray")[4][1], keyBindings.get("keyArray")[6][1], player.speed);
    }

    for (let item of itemsOnGround) { // items on the ground
      item.moveWithPlayerX(keyBindings.get("keyArray")[4][1], keyBindings.get("keyArray")[6][1], player.speed);
    }
  }

  // y-axis
  if (player.y < 0 || player.y > world.HEIGHT) {
    // staying in enviorment
    player.y = constrain(player.y, 0, world.HEIGHT);
    world.imageY = constrain(world.imageY, -world.HEIGHT/2 + sprite.HEIGHT/2, world.HEIGHT/2 - sprite.HEIGHT/2);
  }

  else {
    for (let badGuy of badGuys) { // baddies
      badGuy.moveWithPlayerY(keyBindings.get("keyArray")[3][1], keyBindings.get("keyArray")[5][1], player.speed);
    }

    for (let trap of objects.traps) { // traps
      trap.moveWithPlayerY(keyBindings.get("keyArray")[3][1], keyBindings.get("keyArray")[5][1], player.speed);
    }

    for (let magics of objects.magic) { // magic
      magics.moveWithPlayerY(keyBindings.get("keyArray")[3][1], keyBindings.get("keyArray")[5][1], player.speed);
    }

    for (let arrow of objects.arrows) { // arrows
      arrow.moveWithPlayerY(keyBindings.get("keyArray")[3][1], keyBindings.get("keyArray")[5][1], player.speed);
    }

    for (let slash of objects.melee) { // slashes
      slash.moveWithPlayerY(keyBindings.get("keyArray")[3][1], keyBindings.get("keyArray")[5][1], player.speed);
    }

    for (let item of itemsOnGround) { // items on the ground
      item.moveWithPlayerY(keyBindings.get("keyArray")[3][1], keyBindings.get("keyArray")[5][1], player.speed);
    }
  }
}

function playerMinimap(
  minimapX, minimapY,
  minimapW, minimapH,
  dotSize) {
  // player mapping
  let minimapXMin = minimapX - minimapW/2 + dotSize/2;
  let minimapXMax = minimapX + minimapW/2 - dotSize/2;

  let minimapYMin = minimapY - minimapH/2 + dotSize/2;
  let minimapYMax = minimapY + minimapH/2 - dotSize/2;

  // dot
  let playerX = map(player.x, 0, world.WIDTH, minimapXMin, minimapXMax, true);
  let playerY = map(player.y, 0, world.HEIGHT, minimapYMin, minimapYMax, true);

  // screen
  let rectWidth = map(width, 0, world.WIDTH, minimapXMin, minimapXMax - world.WIDTH*0.01);
  let rectHeight = map(height, 0, world.HEIGHT, minimapYMin, minimapYMax - world.HEIGHT*0.008);

  // player dot
  fill("blue");
  ellipse(playerX, playerY, dotSize);

  // screen
  noFill();
  stroke("white");
  rect(playerX, playerY, rectWidth, rectHeight);
  noStroke();
}

function beautifulMouse() {
  // mouse pointer
  let mousePos = atan2(mouseY - height/2, mouseX - width/2);
  push();
  translate(width/2, height/2);
  rotate(mousePos);
  if (magicOn) { // magic
    image(objectImg.magicIcon, sprite.WIDTH/2, 0, sprite.WIDTH, sprite.HEIGHT)
  }

  else if (rangedOn) { // ranged
    image(objectImg.bowIcon, sprite.WIDTH/2, 0, sprite.WIDTH, sprite.HEIGHT);
  }

  else { // melee
    image(objectImg. swordIcon, sprite.WIDTH/2, 0, sprite.WIDTH, sprite.HEIGHT);
  }
  pop();
}

function playerCoolDown() {
  let elapsedTime = millis() - attackCoolDownTime;

  if (attackCoolDown && elapsedTime >= lastTimeAttacked) {
    attackCoolDown = false;
  }
  else if (elapsedTime <= lastTimeAttacked){
    let mousePos = atan2(mouseY - height/2, mouseX - width/2);
    push();
    translate(width/2, height/2);
    rotate(mousePos);
    fill(50, 150);
    ellipse(sprite.WIDTH/2, 0, sprite.WIDTH);
    pop();
  }
}

// OTHER FUNCTIONS-
function waiting() {
  let waiting = millis();
  while (millis() - waiting <= WAIT_TIME) {
    nothing--;
  }
}

function keyPressed() {
  if (startingState === 2) {
    // open settings
    if (keyCode === keyBindings.get("settings")) {
      settingsIsOpen = !settingsIsOpen;
      settingsChoice = -1;
    }

    // open map
    if (keyCode === keyBindings.get("keyArray")[9][1] && !inventoryIsOpen) {
      mapIsOpen = !mapIsOpen;
    }

    if (!settingsIsOpen) {
      // open inventory
      if (keyCode === keyBindings.get("keyArray")[8][1]) {
        inventoryIsOpen = !inventoryIsOpen;
      }

      // toggle magic attack
      if (keyCode === keyBindings.get("keyArray")[1][1]) {
        magicOn = !magicOn;
        rangedOn = false;
      }

      // toggle melee/ranged
      if (keyCode === keyBindings.get("keyArray")[0][1]) {
        rangedOn = !rangedOn;
        magicOn = false;
      }

      if (!inventoryIsOpen) {
        // consume health potion
        if (keyCode === keyBindings.get("keyArray")[10][1]) {
          consumeHealthPotion();
        }

        // consume mana potion
        if (keyCode === keyBindings.get("keyArray")[11][1]) {
          consumeManaPotion();
        }

        // toggle walk
        if (keyCode === keyBindings.get("walk")) {
          player.toggleWalk = !player.toggleWalk;
        }

        // place traps
        if (keyCode === keyBindings.get("keyArray")[2][1] && objects.traps.length < maxTraps && numOfTraps > 0) {
          objects.traps.push(new Trap(width/2, height/2, player.x, player.y, false));
          numOfTraps--;
        }
      }
    }
  }
}

function mousePressed() {
  // player attack
  if (startingState === 2 && !settingsIsOpen && !inventoryIsOpen && !mapIsOpen && !attackCoolDown) {
    // magic
    if (magicOn) {
      if (player.mp >= 10) {
        objects.magic.push(new FireBall(0, sprite.WIDTH));
        player.mp -= 10;
        attackCoolDown = true;
        lastTimeAttacked = millis();
      }
    }

    // ranged
    else if (rangedOn && numOfArrows > 0) {
      objects.arrows.push(new Arrow(0, sprite.WIDTH));
      numOfArrows--;
      attackCoolDown = true;
      lastTimeAttacked = millis();
    }
    // melee
    else if (!rangedOn) {
      objects.melee.push(new Sword(0, sprite.WIDTH));
      attackCoolDown = true;
      lastTimeAttacked = millis();
    }
  }

  if (inventoryIsOpen) {
    // interacting with inventory
    let x = floor((mouseX - textTop/2) / inventoryBoxSize);
    let y = floor((mouseY - textTop/2) / inventoryBoxSize);

    if (x < invenWidth && x >= 0 && y < invenHeight && y >= 0) {
      let newMouse = inventory[y][x];
      let gridSpot = mouseHolding;

      inventory[y][x] = gridSpot;
      mouseHolding = newMouse;
    }
  }
}

//------------------------------------------------------------------------------
//  PLAYING THE GAME, startingState 3            END
//------------------------------------------------------------------------------
