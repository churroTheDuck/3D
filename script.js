var x = -180;
var y = 0;
var z = 0;
var positionVar = 0;
var altitude = 12000;
var pitchUp = false;
var pitchDown = false;
var yawLeft = false;
var yawRight = false;
var rollLeft = false;
var rollRight = false;

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
	//textFont(gotham);  
	textScreen = createGraphics(windowWidth, windowHeight);
	textScreen.fill("white");
	textScreen.text("Altitude", width / 2, height / 2);
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
	//ambientLight(255, 255, 255);
	//directionalLight(255, 255, 255, 0, 0, altitude + 10);
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
	pop();
	push();
	translate(0, -8000, altitude);
	texture(backgroundImg);
	box(10000, 10000);
	pop();
	translate(0, 0, 0);
	image(f16dark, width / 2, height / 2)
	//image(textScreen, -width / 2, -height / 2);
	cam.setPosition(0, 200, altitude + 25);
	positionVar -= 0.1;
	altitude -= ((x + 180) / 100);
}

	function keyPressed() {
		if (key == "a") {
			yawLeft = true;
		}
		if (key == "s") {
			pitchUp = true;
		}
		if (key == "d") {
			yawRight = true;
		}
		if (keyCode == 37) {
			rollLeft = true;
		}
		if (keyCode == 39) {
			rollRight = true;
		}
	}

	function keyReleased() {
		if (key == "w") {
			pitchDown = false;
		}	
		if (key == "a") {
			yawLeft = false;
		}
		if (key == "s") {
			pitchUp = false;
		}
		if (key == "d") {
			yawRight = false;
		}		
		if (keyCode == 37) {
			rollLeft = false;
		}
		if (keyCode == 39) {
			rollRight = false;
		}
	}