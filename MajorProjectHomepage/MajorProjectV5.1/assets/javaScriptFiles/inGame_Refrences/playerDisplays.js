function playerDisplays() {
  push();
  textFont(fonts.default, fontSize.playersDisplay);
  // check enviorment
  displayEnviorment();
  checkWorld();

  // mini-map
  miniMap();

  // player
  playerSprite();
  playerLvL();
  playerAttackIcon();
  inventoryQuickCheck();
  infoBars();
  pop();
}

// check enviorment
function displayEnviorment() {
  push();
  fill(world.state.color);
  textAlign(CENTER, TOP);
  text(world.state.name, 0, -height/2);
  pop();
}

function checkWorld() {
  if (world.checkingState) {
    worldEnviorment.forEach(checkZone);
    world.checkingState = false;
    world.lastCheck = millis();
  }
  else {
    let elapsedTime = millis() - world.lastCheck;
    if (elapsedTime > world.checkTimer)
      world.checkingState = true;
  }
}

function checkZone(value, key, map) {
  if (inZone(player.x, player.y, value.zone))
    world.state = map.get(key);
}

function inZone(x, y, zone) {
  return x >= zone.x-zone.wid/2 && x <= zone.x+zone.wid/2
   && y >= zone.y-zone.hei/2 && y <= zone.y+zone.hei/2;
}

// mini-map
function miniMap() {
  // padding
  fill("gold");
  rect(minimap.x, minimap.y, minimap.padWidth, minimap.padHeight);

  // background image
  image(world.state.img, minimap.x, minimap.y, minimap.imgWidth-minimap.screenWidth/2, minimap.imgHeight-minimap.screenHeight/2);

  mapPlayer();
}

function mapPlayer(
  mapX = minimap.x, mapY = minimap.y,
  mapW = minimap.imgWidth, mapH = minimap.imgHeight,
  dotSize = player.dotSize, hideScreen = false
) {
  // map position
  let mapMinX = mapX - mapW/2 + dotSize;
  let mapMaxX = mapX + mapW/2 - dotSize;
  let mapMinY = mapY - mapH/2 + dotSize;
  let mapMaxY = mapY + mapH/2 - dotSize;

  // dot
  let playerX = map(player.x, -world.width/2, world.width/2, mapMinX - minimap.padWidth*0.02, mapMaxX + minimap.padWidth*0.02);
  let playerY = map(player.y, -world.height/2, world.height/2, mapMinY - minimap.padHeight*0.02, mapMaxY + minimap.padHeight*0.02);
  fill("blue");
  ellipse(playerX, playerY, dotSize);

  if (!hideScreen) {
    // screen
    push();
    noFill();
    stroke("white");
    playerX = constrain(playerX, mapX-minimap.imgWidth/2+minimap.screenWidth*0.85, mapX+minimap.imgWidth/2-minimap.screenWidth*0.85);
    playerY = constrain(playerY, mapY-minimap.imgHeight/2+minimap.screenHeight*0.85, mapY+minimap.imgHeight/2-minimap.screenHeight*0.85);
    rect(playerX, playerY, minimap.screenWidth, minimap.screenHeight);
    pop();
  }
}

// player
function playerSprite() {
  image(player.race.img, 0, 0, spriteSize.width, spriteSize.height);

  // name and character
  push();
  fill("white");
  textAlign(LEFT, TOP);
  text(player.name+"\n"+player.race.name+", "+player.skill.name, -width*0.49, -height*0.485);
  pop();
}

function playerLvL() {
  fill("black");
  rect(0, height*0.475, width*0.20, height*0.075);

  // level and experience
  let expPercent = player.exp/player.nextLvl*100;
  fill("white");
  text("Exp. "+player.exp.toFixed(0)+"/"+player.nextLvl.toFixed(0)+"\n"+expPercent.toFixed(2)+"%", 0, height*0.46);
  text("Lv. "+player.lvl, 0, spriteSize.height*0.60);

  // points to spend
  if (player.points > 0) {
    push();
    textSize(fontSize.default*2);
    fill("yellow");
    text("!", -width*0.105, height*0.45);
    text("!", width*0.105, height*0.45);
    pop();
  }
}

function playerAttackIcon() {
  let pointAngle = atan2(mouseY - height/2, mouseX - width/2);
  let itemIcon;

  push();
  // point icon at pointer
  rotate(pointAngle);
  if (player.attackState === "melee")
    itemIcon = itemImg.swordIcon;

  else if (player.attackState === "ranged")
    itemIcon = itemImg.bowIcon;

  else if (player.attackState === "magic")
    itemIcon = itemImg.magicIcon;

  // effect when unable to attack
  if (player.coolDown) {
    fill(50, 175);
    ellipse(spriteSize.width*0.50, 0, spriteSize.height);
  }

  image(itemIcon, spriteSize.width*0.50, 0, spriteSize.width, spriteSize.height);
  pop();
}

function inventoryQuickCheck() {
  push();
  textAlign(RIGHT, BOTTOM);
  textSize(fontSize.default);
  fill("red");
  let infoStuff = "";

  if (allItems.get("Hp Potion").amount > 0)
    infoStuff = infoStuff + "Hp Potions - "+allItems.get("Hp Potion").amount+"\n";

  if (allItems.get("Mp Potion").amount > 0)
    infoStuff = infoStuff + "Mp Potions - "+allItems.get("Mp Potion").amount+"\n";

  if (allItems.get("Arrows").amount > 0)
    infoStuff = infoStuff + "Arrows - "+allItems.get("Arrows").amount+"\n";

  if (allItems.get("Traps").amount > 0)
    infoStuff = infoStuff + "Traps - "+allItems.get("Traps").amount+"\n";


  text(infoStuff, width*0.48, height*0.50);
  pop();
}

function infoBars() {
  push();
    textFont("BOLD", fontSize.default*0.75);
    let left = -width*0.49;
    let top = -height*0.425;
    let w = width*0.20;
    let h = height*0.04;
    let textX = left+w/2;
    rectMode(CORNER);

    // health
    push();
    backBar(left, top, w, h);
    let changeOfHP = player.totHp - player.hp;
    let mappedHP = map(changeOfHP, 0, player.totHp, 0, w);
    fill("red");
    rect(left, top, w-mappedHP, h);
    // numbers
    fill("white");
    text(player.hp + "/" + player.totHp, textX, top+h/2);
    pop();

    // mana
    push();
    let top2 = top + h*1.25;
    backBar(left, top2, w, h);

    let changeOfMP = player.totMp - player.mp;
    let mappedMP = map(changeOfMP, 0, player.totMp, 0, w);
    fill("blue");
    rect(left, top2, w-mappedMP, h);
    // numbers
    fill("white");
    text(player.mp + "/" + player.totMp, textX, top2+h/2);
    pop();
  pop();
}

function backBar(x, y, w, h) {
  push();
  stroke("silver");
  fill("gray");
  rect(x-1, y-1, w, h);
  pop();
}
