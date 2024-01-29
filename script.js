var bulletsX = [];
var bulletsY = [];
var bulletsZ = [];
var bulletsXDir = [];
var bulletsZDir = [];
var shoot = false;

function preload() {
	backgroundImg = loadImage("background.jpg");  
	gotham = loadFont("Gotham-XLight.otf");
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	game = createGraphics(windowWidth, windowHeight, WEBGL);
	angleMode(DEGREES);
	textAlign(CENTER);
	imageMode(CENTER);
	textFont(gotham);
}

function draw() {
	push();
	if (shoot) {
		bulletsX.push(-100);
		bulletsY.push(0);
		bulletsZ.push(0);
		bulletsXDir.push();
		bulletsZDir.push();
	}
	pop();
	game.background(0);
	game.push();
	game.translate(0, 0, 10);
	game.noFill();
	game.stroke("green");
	game.strokeWeight(1);
	game.torus(10, 1, 16, 1);
	game.pop();
	for (var i = 0; i < bulletsX.length; i++) {
		game.push();
		game.translate(bulletsX[i], bulletsY[i], bulletsZ[i]);
		game.fill("white");
		game.noStroke();
		game.box(10);
		bulletsX[i] += Math.sin(bulletsXDir[i]);
		bulletsZ[i] += Math.cos(bulletsZDir[i]);
		bulletsZ[i] -= 10;
		if (bulletsY[i] >= 50000) {
			bulletsX.splice(i, 1);
			bulletsY.splice(i, 1);
			bulletsZ.splice(i, 1);
			bulletsXDir.splice(i, 1);
			bulletsZDir.splice(i, 1);
		}
		game.pop();
	}
	background(0);
	image(game, width / 2, height / 2);
}

	function keyPressed() {
		if (key == " ") {
			shoot = true;
		}
	}

	function keyReleased() {
		if (key == " ") {
			shoot = false;
		}		
	}