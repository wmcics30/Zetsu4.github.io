function settingItemMap() {
  // non equipable items
  allItems.set("Hp Potion", {name:"Hp Potion", description: "Replenishes HP", cost: 20, img: itemImg.hpPotion,
  dropChance: 20, dropAmountMin: 1, dropAmountMax: 2, equipable: false, amount: 0});

  allItems.set("Mp Potion", {name:"Mp Potion", description: "Replenishes MP", cost: 15, img: itemImg.mpPotion,
  dropChance: 30, dropAmountMin: 1, dropAmountMax: 3, equipable: false, amount: 0});

  allItems.set("Arrows", {name:"Arrows", description: "Used with bow", cost: 2, img: itemImg.arrowAttack,
  dropChance: 40, dropAmountMin: 1, dropAmountMax: 10, equipable: false, amount: 0});

  allItems.set("Traps", {name:"Traps", description: "Traps to slow\nfast enemy's", cost: 10, img: itemImg.trap,
  dropChance: 35, dropAmountMin: 1, dropAmountMax: 5, equipable: false, amount: 0});

  allItems.set("Town Portal", {name:"Town Portal", description: "Teleport to\ntown instantly", cost: 5, img: itemImg.townPortal,
  dropChance: 25, dropAmountMin: 1, dropAmountMax: 2, equipable: false, amount: 0});

  allItems.set("Money", {name:"Money", description: "The currency\nof equestria", cost: 0, img: itemImg.money,
  dropChance: 25, dropAmountMin: 5, dropAmountMax: 15, equipable: false, amount: 0});


  // equipment
  equipmentWeapons();
  equipmentHead();
  equipmentChest();
  equipmentFeet();
  equipmentShoulders();
  equipmentLegs();
  equipmentHands();
}

function equipmentWeapons() {
  allItems.set("Pitch Fork", {name:"Pitch Fork", description: "A pitch fork\nthat mobs carry", cost: 20, img: itemImg.equipment.pitchFork,
  dropChance: 30, dropAmountMin: 1, dropAmountMax: 1, equipable: true, equipSlot: "weapon", stats: pitchFork, amount: 0});

  allItems.set("Shifty Sword", {name:"Shifty Sword", description: "careful, it's shifty", cost: 30, img: itemImg.equipment.shiftySword,
  dropChance: 20, dropAmountMin: 1, dropAmountMax: 1, equipable: true, equipSlot: "weapon", stats: shiftySword, amount: 0});

  allItems.set("Cross Bow", {name:"Cross Bow", description: "It's a cross bow", cost: 20, img: itemImg.equipment.crossBow,
  dropChance: 30, dropAmountMin: 1, dropAmountMax: 1, equipable: true, equipSlot: "weapon", stats: crossBow, amount: 0});

  allItems.set("Cross Boe", {name:"Cross Boe", description: "It's crossed boe's", cost: 25, img: itemImg.equipment.crossBoe,
  dropChance: 20, dropAmountMin: 1, dropAmountMax: 1, equipable: true, equipSlot: "weapon", stats: crossBoe, amount: 0});

  allItems.set("Real Wand", {name:"Real Wand", description: "Totally a real wand\n(not a stick)", cost: 15, img: itemImg.equipment.realWand,
  dropChance: 30, dropAmountMin: 1, dropAmountMax: 1, equipable: true, equipSlot: "weapon", stats: realWand, amount: 0});

  allItems.set("Real Staff", {name:"Real Staff", description: "Surely it's different\nfrom a stick", cost: 20, img: itemImg.equipment.realStaff,
  dropChance: 20, dropAmountMin: 1, dropAmountMax: 1, equipable: true, equipSlot: "weapon", stats: realStaff, amount: 0});

  allItems.set("Stick", {name:"Stick", description: "He didn't even\nchange the picture", cost: 100, img: itemImg.equipment.realWand,
  dropChance: 1, dropAmountMin: 1, dropAmountMax: 1, equipable: true, equipSlot: "weapon", stats: stick, amount: 0});

  allItems.set("Small Rock", {name:"Small Rock", description: "A rock you\nfound", cost: 1, img: itemImg.equipment.smallRock,
  dropChance: 50, dropAmountMin: 1, dropAmountMax: 1, equipable: true, equipSlot: "weapon", stats: smallRock, amount: 0});
}

function equipmentHead() {
  allItems.set("Flat Rock", {name:"Flat Rock", description: "A flat rock\nfor your head", cost: 10, img: itemImg.equipment.flatRock,
  dropChance: 30, dropAmountMin: 1, dropAmountMax: 1, equipable: true, equipSlot: "head", stats: flatRock, amount: 0});

  allItems.set("Paper Bag", {name:"Paper Bag", description: "To cover your\nugly mug", cost: 15, img: itemImg.equipment.paperBag,
  dropChance: 30, dropAmountMin: 1, dropAmountMax: 1, equipable: true, equipSlot: "head", stats: paperBag, amount: 0});
}

function equipmentChest() {
  allItems.set("Brown Shirt", {name:"Brown Shirt", description: "It's made out\nof wood", cost: 20, img: itemImg.equipment.brownShirt,
  dropChance: 25, dropAmountMin: 1, dropAmountMax: 1, equipable: true, equipSlot: "chest", stats: brownShirt, amount: 0});

  allItems.set("Grey Shirt", {name:"Grey Shirt", description: "I thought it\nwas steel", cost: 30, img: itemImg.equipment.greyShirt,
  dropChance: 20, dropAmountMin: 1, dropAmountMax: 1, equipable: true, equipSlot: "chest", stats: greyShirt, amount: 0});
}

function equipmentFeet() {
  allItems.set("Grass", {name:"Grass", description: "It's grass", cost: 5, img: itemImg.equipment.grass,
  dropChance: 45, dropAmountMin: 1, dropAmountMax: 1, equipable: true, equipSlot: "feet", stats: grass, amount: 0});

  allItems.set("Grass Shoes", {name:"Grass Shoes", description: "I thought it\nwas steel", cost: 15, img: itemImg.equipment.grassShoes,
  dropChance: 30, dropAmountMin: 1, dropAmountMax: 1, equipable: true, equipSlot: "feet", stats: grassShoes, amount: 0});
}

function equipmentShoulders() {
  allItems.set("Round Rocks", {name:"Round Rocks", description: "Round rocks for\nyour shoulders", cost: 10, img: itemImg.equipment.roundRocks,
  dropChance: 35, dropAmountMin: 1, dropAmountMax: 1, equipable: true, equipSlot: "shoulders", stats: roundRocks, amount: 0});

  allItems.set("Weak Plates", {name:"Weak Plates", description: "Shoulder plates that\nare weak", cost: 20, img: itemImg.equipment.weakPlates,
  dropChance: 25, dropAmountMin: 1, dropAmountMax: 1, equipable: true, equipSlot: "shoulders", stats: weakPlates, amount: 0});
}

function equipmentLegs() {
  allItems.set("Blue Pants", {name:"Blue Pants", description: "Blue Pants", cost: 20, img: itemImg.equipment.bluePants,
  dropChance: 20, dropAmountMin: 1, dropAmountMax: 1, equipable: true, equipSlot: "legs", stats: bluePants, amount: 0});

  allItems.set("Grass Pants", {name:"Grass Pants", description: "Pants made from\ngrass", cost: 20, img: itemImg.equipment.grassPants,
  dropChance: 35, dropAmountMin: 1, dropAmountMax: 1, equipable: true, equipSlot: "legs", stats: grassPants, amount: 0});
}

function equipmentHands() {
  allItems.set("Leather Gloves", {name:"Leather Gloves", description: "Gloves made out\nof leather", cost: 30, img: itemImg.equipment.leatherGloves,
  dropChance: 20, dropAmountMin: 1, dropAmountMax: 1, equipable: true, equipSlot: "hands", stats: leatherGloves, amount: 0});

  allItems.set("Rock Gloves", {name:"Rock Gloves", description: "Rough rocks for\nyour hands", cost: 35, img: itemImg.equipment.rockGloves,
  dropChance: 35, dropAmountMin: 1, dropAmountMax: 1, equipable: true, equipSlot: "hands", stats: rockGloves, amount: 0});
}