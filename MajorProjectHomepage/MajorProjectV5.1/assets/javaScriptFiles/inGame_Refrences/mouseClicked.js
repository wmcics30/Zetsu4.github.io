function mousePressed() {
  if (startingState === 2 && state === 0) {
    if (!player.coolDown) {
      let attacked = false;
      // player attacks
      if (player.attackState === "melee") {
        items.playerAttack.push(new Attack(0, 0, 0, 0, melee.attackSpeed, melee.attackDist, player.mDmg, melee.img));
        attacked = true;
      }

      if (player.attackState === "ranged" && allItems.get("Arrows").amount > 0) {
        allItems.get("Arrows").amount--;
        items.playerAttack.push(new Attack(0, 0, 0, 0, ranged.attackSpeed, ranged.attackDist, player.rDmg, ranged.img, spriteSize.width, spriteSize.height/2));
        attacked = true;
        if (allItems.get("Arrows").amount <= 0)
          checkEmpty("Arrows");
      }

      if (player.attackState === "magic" && player.mp >= 10) {
        player.mp -= 10;
        items.playerAttack.push(new Attack(0, 0, 0, 0, spellCaster.attackSpeed, spellCaster.attackDist, player.sDmg, spellCaster.img));
        attacked = true;
      }

      player.coolDown = attacked;
      player.previousAttack = millis();
    }
  }
}
