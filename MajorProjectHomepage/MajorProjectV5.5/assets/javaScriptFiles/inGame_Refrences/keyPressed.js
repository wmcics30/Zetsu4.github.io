function keyPressed() {
  if (startingState === 2) {
    // toggle menus
    if (keyCode === keyBindings.get("Settings").code) // open settings
      toggleStates("Settings");

    if (keyCode === keyBindings.get("Inventory").code) // open inventory
      toggleStates("Inventory");

    if (keyCode === keyBindings.get("Open Map").code) // open world map
      toggleStates("Map");

    if (state === 0) {
      // toggle speed
      if (keyCode === keyBindings.get("Toggle Walk").code)
        player.toggleSpeed = !player.toggleSpeed;

      // toggle equip
      if (keyCode === keyBindings.get("Toggle Ranged").code) { // ranged
        if (player.attackState === "melee" || player.attackState === "magic")
          player.attackState = "ranged";
        else
          player.attackState = "melee";
      }

      if (keyCode === keyBindings.get("Toggle Magic").code) { // magic
        if (player.attackState === "melee" || player.attackState === "ranged")
          player.attackState = "magic";
        else
          player.attackState = "melee";
      }

      // place trap
      if (keyCode === keyBindings.get("Place Trap").code && allItems.get("Traps").amount > 0) {
        items.playerAttack.push(new Trap(0, 0, 0, 0, player.tDmg, itemImg.trap, sounds.trapHit));
        allItems.get("Traps").amount--;
        if (allItems.get("Traps").amount <= 0)
          checkEmpty("Traps");
      }

      // consume potions
      if (keyCode === keyBindings.get("Consume HP Poition").code && allItems.get("Hp Potion").amount > 0)  // health
        consumePotion("Hp Potion", player.hp, player.totHp);

      if (keyCode === keyBindings.get("Consume MP Poition").code && allItems.get("Mp Potion").amount > 0)  // mana
        consumePotion("Mp Potion", player.mp, player.totMp);

      // use town portal
      if (keyCode === keyBindings.get("Use Town Portal").code && allItems.get("Town Portal").amount > 0)
        teleportArea("Over World");
    }

    // changing areas
    if (keyCode === keyBindings.get("Enter Area").code && world.state.enter)
      changeArea(world.state.newArea);
  }
}

function changeArea(newArea) {
  world.area = newArea;
  items.playerAttack = [];
  enemyArr = [];
}

function toggleStates(setState) {
  // toggle states
  if (state === 0) {
    previousState = state;
    state = setState;
  }

  else
    state = previousState;

  drawingBack = true;
}
