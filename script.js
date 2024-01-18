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
var bulletsXDir = [];
var bulletsZDir = [];
var shoot = false;

function preload() {
	f16 = loadModel("f16.stl", true);
	f16Img = loadImage("f16.png");
	f16light = loadImage("f16light.png");
	f16dark = loadImage("f16dark.png");
	landTexture = loadImage("land.jpg");
	backgroundImg = loadImage("background.jpg");  
	gotham = loadFont("Gotham-XLight.otf");
	shot = loadSound("shot.mp3");
}

function setup() {
	createCanvas(windowWidth, windowHeight, WEBGL);
	angleMode(DEGREES);
	cam = createCamera();
	cam.tilt(-85);
	print(f16.uvs)
	for(let i=0; i< f16.uvs.length; i++) {
		f16.uvs[i][1] = 1.-f16.uvs[i][1];
	}
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
	noStroke();
	texture(f16Img);
	model(f16);
	if (shoot && Math.random() * 1) {
		bulletsX.push(10);
		bulletsY.push(Math.random() * 20);
		bulletsZ.push(altitude);
		bulletsXDir.push(Math.random() * 1);
		bulletsZDir.push(Math.random() * 1);
		shot.play();
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
		bulletsX[i] += Math.sin(bulletsXDir[i]);
		bulletsZ[i] += Math.cos(bulletsZDir[i]);
		bulletsY[i] -= 50;
		if (bulletsY[i] <= - 50000) {
			bulletsX.splice(i, 1);
			bulletsY.splice(i, 1);
			bulletsZ.splice(i, 1);
			bulletsXDir.splice(i, 1);
			bulletsZDir.splice(i, 1);
		}
		pop();
	}
	translate(0, 0, 0);
	cam.setPosition(0, 200, altitude + 25);
	if (yawLeft) {
		z -= 1;
	}
	if (yawRight) {
		z += 1;
	}
	positionVar -= 0.1;
	altitude -= ((x + 180) / 100);
}

	function keyPressed() {
		if (key == " ") {
			shoot = true;
		}
		if (key == "a") {
			yawLeft = true;
		}
		if (key == "d") {
			yawRight = true;
		}
	}

	function keyReleased() {
		if (key == " ") {
			shoot = false;
		}		
		if (key == "a") {
			yawLeft = false;
		}
		if (key == "d") {
			yawRight = false;
		}
	}