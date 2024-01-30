var bulletsX = [];
var bulletsY = [];
var bulletsZ = [];
var bulletsXDir = [];
var bulletsYDir = [];
var shoot = false;
var left = false;
var right = false;
var up = false;
var down = false;
var directionX = 0;
var directionY = 0

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
	if (left) {
		directionX -= 0.01;
	}
	if (right) {
		directionX += 0.01;
	}
	if (up) {
		directionY += 0.01;
	}
	if (down) {
		directionY -= 0.01;
	}
	if (shoot) {
		bulletsX.push(0);
		bulletsY.push(200);
		bulletsZ.push(200);
		bulletsXDir.push(directionX + Math.random() / 50);
		bulletsYDir.push(directionY + Math.random() / 50);
	}
	pop();
	game.background(0);
	/*game.push();
	game.translate(0, 0, 10);
	game.noFill();
	game.stroke("green");
	game.strokeWeight(1);
	game.torus(10, 1, 16, 1);
	game.pop();*/
	for (var i = 0; i < bulletsX.length; i++) {
		game.push();
		game.translate(bulletsX[i], bulletsY[i], bulletsZ[i]);
		game.fill("red");
		game.noStroke();
		game.sphere(3);
		bulletsX[i] += Math.sin(bulletsXDir[i]) * 50;
		bulletsY[i] += Math.cos(bulletsYDir[i]) * 10;
		bulletsZ[i] -= 50;
		if (bulletsY[i] >= 20000) {
			bulletsX.splice(i, 1);
			bulletsY.splice(i, 1);
			bulletsZ.splice(i, 1);
			bulletsXDir.splice(i, 1);
			bulletsYDir.splice(i, 1);
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
		if (key == "a") {
			left = true;
		}
		if (key == "d") {
			right = true;
		}
		if (key == "w") {
			up = true;
		}
		if (key == "s") {
			down = true;
		}
	}

	function keyReleased() {
		if (key == " ") {
			shoot = false;
		}		
			if (key == "a") {
			left = false;
		}
		if (key == "d") {
			right = false;
		}	
		if (key == "w") {
			up = false;
		}
		if (key == "s") {
			down = false;
		}
	}