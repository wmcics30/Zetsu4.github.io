function itemsInWorld() {
  // player attacks
  for (let i=items.playerAttack.length-1; i >= 0; i--) {
    items.playerAttack[i].display();
    if (items.playerAttack[i].move()) {
      if (items.playerAttack[i].trap) {
        sounds.pickUp.play();
        // pick up placed trap
        if (allItems.get("Traps").amount <= 0)
          // not in inventory
          putInInventory({name: "Traps"});

        else
          // in inventory
          allItems.get("Traps").amount++;
      }

      items.playerAttack.splice(i, 1);
    }
  }

  // items on ground
  for (let i=items.onGround.length-1; i >= 0; i--) {
    if (items.onGround[i].areaExisting === world.area) {
      items.onGround[i].display();
      if (dist(items.onGround[i].x, items.onGround[i].y, 0, 0) <= (spriteSize.width+spriteSize.height)/2) {
        // pick up item
        let itemToAdd = items.onGround.splice(i, 1);
        if (allItems.get(itemToAdd[0].name).amount <= 0)
          // not in inventory
          putInInventory(itemToAdd[0], itemToAdd[0].amount);

        else
          // in inventory
          allItems.get(itemToAdd[0].name).amount += itemToAdd[0].amount;

        // add text to recent pick ups
        recentPickUps += itemToAdd[0].name+" - "+itemToAdd[0].amount+"\n";
        recentsLastTime = millis();
        sounds.pickUp.play();
      }
    }
  }
}

function lootDrop(enemy) {
  // loot drop
  let numOfItems = int(random(enemy.lvl));

  for (let i = 0; i < numOfItems; i++)
    itemDropChance(enemy);
}

// move with player
function moveItemsX(dir) {
  let speed = player.speed*dir;

  // items on ground
  for (let i=items.onGround.length-1; i >= 0; i--) {
    items.onGround[i].x += speed;
  }

  // players attacks
  for (let i=items.playerAttack.length-1; i >= 0; i--) {
    items.playerAttack[i].changeX += speed;
  }

  // enemy attacks
  for (let i=items.enemyAttack.length-1; i >= 0; i--) {
    items.enemyAttack[i].changeX += speed;
  }
}

function moveItemsY(dir) {
  let speed = player.speed*dir;

  // items on ground
  for (let i=items.onGround.length-1; i >= 0; i--) {
    items.onGround[i].y += speed;
  }

  // players attacks
  for (let i=items.playerAttack.length-1; i >= 0; i--) {
    items.playerAttack[i].changeY += speed;
  }

  // enemy attacks
  for (let i=items.enemyAttack.length-1; i >= 0; i--) {
    items.enemyAttack[i].changeY += speed;
  }
}

function checkEmpty(name) {
  for (let y = 0; y < player.inventory.length; y++) {
    for (let x = 0; x < player.inventory[y].length; x++) {
      if (player.inventory[y][x] !== "empty") {
        if (player.inventory[y][x].name === name) {
          player.inventory[y][x] = "empty";
          break;
        }
      }
    }
  }
}
