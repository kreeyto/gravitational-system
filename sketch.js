let G = 1;
let centralMass = 1000;
let centralObject;
let objects = [];
let stars = [];

let initialMouseX;
let initialMouseY;

let numObjects = 0; 
let numSwallowed = 0; 

function setup() {
  createCanvas(windowWidth, windowHeight);
  centralObject = new GravitationalObject(width/2, height/2, centralMass);

  for (let i = 0; i < 100; i++) {
    stars.push(createVector(random(width), random(height)));
  }
}

function draw() {
  background(0);

  for (let star of stars) {
    stroke(255, 500);
    point(star.x, star.y);
  }

  centralObject.draw();
  
  for (let object of objects) {
    object.draw();
    object.update();
  }
  
  if (mouseIsPressed) {
    let x = initialMouseX;
    let y = initialMouseY;
    let sensitivity = 0.05;
    let vx = (initialMouseX - mouseX) * sensitivity;
    let vy = (initialMouseY - mouseY) * sensitivity;
    
    stroke(255, 100);
    noFill();
    beginShape();
    for (let i = 0; i < 300; i++) {
      if (dist(x, y, centralObject.x, centralObject.y) < centralObject.r) {
        break;
      }
      vertex(x, y);
      let ax = G * centralMass * (centralObject.x - x) / pow(dist(x, y, centralObject.x, centralObject.y), 3);
      let ay = G * centralMass * (centralObject.y - y) / pow(dist(x, y, centralObject.x, centralObject.y), 3);
      vx += ax;
      vy += ay;
      x += vx;
      y += vy;
    }
    endShape();
    
    stroke(255);
    line(initialMouseX, initialMouseY, mouseX, mouseY);
  }

   fill(255);
   noStroke();
   textSize(20);
   text(`bodies on the (whole) system: ${numObjects}`, 20, 40);
   text(`swallowed: ${numSwallowed}`, 20, 70);
}

function mousePressed() {
  initialMouseX = mouseX;
  initialMouseY = mouseY;
}

function mouseReleased() {
  let x = initialMouseX;
  let y = initialMouseY;
  let sensitivity = 0.05;
  let vx = (initialMouseX - mouseX) * sensitivity;
  let vy = (initialMouseY - mouseY) * sensitivity;
  
  objects.push(new GravitationalObject(x, y, random(10), vx, vy));

  numObjects++; 
}

class GravitationalObject {
  constructor(x, y, m, vx=0, vy=0) {
    this.x = x;
    this.y = y;
    this.m = m;
    this.vx = vx;
    this.vy = vy;
    this.alpha = 255; 
    
    if (m == centralMass) {
      this.r = sqrt(this.m) / 2; 
    } else {
      this.r = sqrt(this.m) * 2; 
    }
    
    this.trail = [];
  }
  
  draw() {
    if (this.m == centralMass) {

      fill(0);
      stroke(255);
      strokeWeight(1);
      circle(this.x, this.y, this.r*2);
    } else {

      noStroke();
      fill(255);
      circle(this.x, this.y, this.r*2);
    
      noFill();
      beginShape();
      for (let i = 0; i < this.trail.length; i++) {
        let p = this.trail[i];
        stroke(255, map(i, 0, this.trail.length, 100, 255));
        vertex(p.x, p.y);
      }
      endShape();
      
      this.trail.push(createVector(this.x, this.y));
      
      if (this.trail.length > 100) {
        this.trail.splice(0,1);
      }
    }
  }
  
  update() {
    let ax = G * centralMass * (centralObject.x - this.x) / pow(dist(this.x, this.y, centralObject.x, centralObject.y),3);
    let ay = G * centralMass * (centralObject.y - this.y) / pow(dist(this.x, this.y, centralObject.x, centralObject.y),3);
    
    for (let object of objects) {
      if (object != this) {
        ax += G * object.m * (object.x - this.x) / pow(dist(this.x, this.y, object.x, object.y),3);
        ay += G * object.m * (object.y - this.y) / pow(dist(this.x, this.y, object.x, object.y),3);
      }
    }
    
    this.vx += ax;
    this.vy += ay;
    
    this.x += this.vx;
    this.y += this.vy;

    if (dist(this.x, this.y, centralObject.x, centralObject.y) < centralObject.r) {
      numSwallowed++; 
      numObjects--; 
      let index = objects.indexOf(this);
      if (index != -1) {
        objects.splice(index, 1);
      }
    }
  }
}