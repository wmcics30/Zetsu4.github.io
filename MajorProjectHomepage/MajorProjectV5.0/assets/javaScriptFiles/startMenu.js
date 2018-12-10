function startMenu() {
  if (state === 0) {
    buttons.newGame = new Button(0, height*0.05, width*0.30, height*0.20, buttons.red, buttons.green, "New Game");
    buttons.loadGame = new Button(0, height*0.30, width*0.30, height*0.20, buttons.red, buttons.green, "Load Game - not working");
    state = 1;
  }

  else if (state === 1) {
    // title screen
    fill(217, 128, 38);
    text("WELCOME TO EQUESTRIA", 0, -height*0.45);

    // buttons
    if (buttons.newGame.clicked()) {
      startingState = 1;
      state = 0;
    }

    else if (buttons.loadGame.clicked()) {
      gameOver();
    }
  }
}
