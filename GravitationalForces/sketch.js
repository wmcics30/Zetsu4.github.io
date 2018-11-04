// Gravitational forces
// Travis Ahern
// Nov. 3/18

let mass;
let exponent;
let radius;
let bodiesOfMass = [];
let fixedPos = false;
let paused = false;
let controls = true;
let status = true;
let deleteOn = false;
let massOn = true;
let exponentOn = false;
let radiusOn = false;
let textTop;


function setup() {
  createCanvas(windowWidth, windowHeight);

  // text
  textTop = (width*0.015 + height*0.015)/2;
  textFont("BOLD", textTop);
  textAlign(LEFT, TOP);

  strokeWeight(5);
  stroke("white");
  fill("black");
  noFill();

  rectMode(CENTER);

  // data
  exponent = 24;
  mass = 5.97;
  radius = 50;
}

function draw() {
  background(0);
  showBodiesOfMass();
  if (!paused) {
    moveBodiesOfMass();
    collisionOfBodies();
  }
  writeText();
}

function angle(sx, sy, ex, ey) {
  let dy = ey - sy;
  let dx = ex - sx;
  let theta = Math.atan2(dy, dx); // range (-PI, PI]
  theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
  //if (theta < 0) theta = 360 + theta; // range [0, 360)
  return theta;
}

function moveBodiesOfMass() {
  for (let i = 0; i < bodiesOfMass.length; i++) {
    let totHorzForce = 0;
    let totVertForce = 0;
    let accelerationH = 0;
    let accelerationV = 0;

    for (let j = 0; j < bodiesOfMass.length; j++) {
      if (i !== j) {
        let distance = dist(bodiesOfMass[i].x, bodiesOfMass[i].y, bodiesOfMass[j].x, bodiesOfMass[j].y);
        let force = 6.67e-11 * bodiesOfMass[i].mass * bodiesOfMass[j].mass/(distance*distance);

        let theta = angle(bodiesOfMass[i].x, bodiesOfMass[i].y, bodiesOfMass[j].x, bodiesOfMass[j].y);

        let fH = force*cos(theta);
        let fV = force*sin(theta);

        // right
        if (bodiesOfMass[i].x < bodiesOfMass[j].x) {
          totHorzForce += fH;
        }
        // left
        else {
          totHorzForce -= fH;
        }

        // down
        if (bodiesOfMass[i].y < bodiesOfMass[j].y) {
          totVertForce += fV;
        }
        // up
        else {
          totVertForce -= fV;
        }
      }
    }
    accelerationH = totHorzForce/bodiesOfMass[i].mass;
    accelerationV = totVertForce/bodiesOfMass[i].mass;
    bodiesOfMass[i].move(accelerationH/6e10, accelerationV/6e10);
  }
}

function collisionOfBodies() {
  for (let i = 0; i < bodiesOfMass.length; i++) {
    for (let j = 0; j < bodiesOfMass.length; j++) {
      bodiesOfMass[i].collide(bodiesOfMass[j].x, bodiesOfMass[j].y, bodiesOfMass[j].radius);
    }
  }
}

function showBodiesOfMass() {
  for (let object of bodiesOfMass) {
    object.show();
  }
}

function writeText() {
  push();
  noStroke();
  fill(0,255,0);

  // controls
  if (controls) {
    text("CONTROLS:\n\
Z - toggle controls\n\
X - toggle status\n\
P - pause simulation\n\
F - toggle fixed\n\
C - clear\n\
D - toggle delete\n\
E - toggle exponent\n\
R - toggle radius\n\
'Shift' - change 1st decimal\n\
'Ctrl' - change 2nd decimal\n\
'UP' - increse number\n\
'DOWN' - decrease number\n\
", width*0.005, height*0.005);
  }

  // status
  if (status) {
    textAlign(RIGHT);

    text("STATUS:\n\
Paused - " + paused + "\n\
Fixed - " + fixedPos + "\n\
Delete - " + deleteOn + "\n\
Mass - " + mass.toFixed(2) + "e" + exponent + "Kg " + exponentOn + "\n\
Radius - " + radius + "m " + radiusOn + "\n\
Objects - " + bodiesOfMass.length,
    width - width*0.005, height*0.005);
  }
  pop();
}

function changingNumbers(thisOn, num, massOn = false) {
  let change = 1;

  if (keyIsDown(16)) { // SHIFT
    change = 10;
  }

  else if (keyIsDown(17)) { // CTRL
    change = 100;
  }

  // mass
  if (massOn) {
    change = change/(change*change);
  }

  // number
  if (thisOn) {
    if (keyCode === 38) { // UP
      num += change;
    }
    if (keyCode === 40) { // DOWN
      num -= change;
    }
  }

  return num;
}

function keyPressed() {
  exponent = changingNumbers(exponentOn, exponent);
  radius = changingNumbers(radiusOn, radius);
  mass = changingNumbers(massOn, mass, true);

  // restraints
  if (mass.toFixed(2) >= 10) {
    mass -= 10;
  }
  else if (mass.toFixed(2) < 0) {
    mass += 10;
  }
  radius = constrain(radius, 5, Infinity);

  // toggle exponent
  if (keyCode === 69) { // E
    exponentOn = !exponentOn;
    radiusOn = false;
  }

  // toggle radius
  if (keyCode === 82) { // R
    radiusOn = !radiusOn;
    exponentOn = false;
  }

  // toggle mass
  if (!exponentOn && !radiusOn) {
    massOn = true;
  }
  else {
    massOn = false;
  }

  // toggle controls/status display
  if (keyCode === 90) { // Z
    controls = !controls;
  }
  if (keyCode === 88) { // X
    status = !status;
  }

  // toggle fixed
  if (keyCode === 70) { // F
    fixedPos = !fixedPos;
  }

  // pause game
  if (keyCode === 80) { // P
    paused = !paused;
  }

  if (keyCode === 68) { // D
    deleteOn = !deleteOn;
  }

  // clear
  if (keyCode === 67) { // C
    bodiesOfMass = [];
  }
}

function mousePressed() {
  if (deleteOn) {
    // delete
    for (let i = 0; i < bodiesOfMass.length; i++) {
      if (bodiesOfMass[i].mouseOver()) {
        bodiesOfMass.splice(i, 1);
      }
    }
  }

  // create
  else {
    let randomCol = color(random(10, 255), random(10, 255), random(10, 255));
    let calculatedMass = mass*pow(10, exponent);

    bodiesOfMass.push(new bodyOfMass(mouseX, mouseY, calculatedMass, radius, fixedPos, randomCol));
  }
}
