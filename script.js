var x = -180;
var y = 0;
var z = 0;
var positionVar = 0;
var altitude = 12000;
var yawLeft = false;
var yawRight = false;
var bulletsX = [];
var bulletsY = [];
var bulletsZ = [];
var shoot = false;

function preload() {
	f16 = loadModel("f16.obj", true);
	f16light = loadImage("f16light.png");
	f16dark = loadImage("f16dark.png");
	landTexture = loadImage("land.jpg");
	backgroundImg = loadImage("background.jpg");  
	gotham = loadFont("Gotham-XLight.otf");
}

function setup() {
	createCanvas(windowWidth, windowHeight, WEBGL);
	angleMode(DEGREES);
	cam = createCamera();
	cam.tilt(-85);
}

function draw() {
	background(0);
	if (yawLeft) {
		z -= 1;
	}
	if (yawRight) {
		z += 1;
	}
	if (mouseY < height / 2) {
		x += ((height / 2) - mouseY) / 100;
	} else if (mouseY > height / 2) {
		x -= (mouseY - (height / 2)) / 100;
	}
	if (mouseX < width / 2) {
		y += (width / 2 - mouseX) / 500;
	}
	if (mouseX > width / 2) {
		y -= (mouseX - width / 2) / 500;
	}
	if (x > 180) {
		x = 180;
	}
	if (x < -360) {
		x = -360;
	}
	if (y > 180) {
		y = -180;
	}
	if (y < -360) {
		y = 0;
	}
	push();
	translate(0, 0, 0);
	rotateX(positionVar);
	texture(landTexture);
	sphere(10000, 100, 100);
	pop();
	push();
	translate(0, 0, altitude);
	rotateY(-y);
	translate(0, 0, 10);
	rotateZ(180 + z);
	texture(f16light);
	model(f16);
	if (shoot) {
		bulletsX.push(10);
		bulletsY.push(0);
		bulletsZ.push(altitude);
	}
	pop();
	push();
	translate(0, -8000, altitude);
	texture(backgroundImg);
	box(10000, 10000);
	pop();
	for (var i = 0; i < bulletsX.length; i++) {
		push();
		translate(bulletsX[i], bulletsY[i], bulletsZ[i]);
		rotateX(90);
		fill("white");
		stroke("white");
		cylinder(20, 1, 1, 1);
		bulletsY[i] -= 100;
		bulletsX[i] += Math.random() * 2;
		if (bulletsY[i] <= - 500000) {
			bulletsX.splice(i, 1);
			bulletsY.splice(i, 1);
			bulletsZ.splice(i, 1);
		}
		pop();
	}
	translate(0, 0, 0);
	image(f16dark, width / 2, height / 2)
	cam.setPosition(0, 200, altitude + 25);
	positionVar -= 0.1;
	altitude -= ((x + 180) / 100);
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