var x = 0;
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
var timeMillis = 0;
var alive = true;
var tilted = false;

function preload() {
	f16 = loadModel("f161.obj", true);
	f16light = loadImage("f16light.png");
	f16dark = loadImage("f16dark1.jpeg");
	landTexture = loadImage("land.jpg");
	backgroundImg = loadImage("background.jpg");  
	gotham = loadFont("Gotham-XLight.otf");
	shot = loadSound("shot.mp3");
	engine = loadSound("engine.mp3");
	music = loadSound("music.mp3");
}

function setup() {
	createCanvas(windowWidth, windowHeight, WEBGL);
	angleMode(DEGREES);
	textAlign(CENTER);
	textFont(gotham);
	shot.setVolume(0.3);
	music.setVolume(0.5);
	engine.setVolume(0.5);
	cam = createCamera();
	cam.tilt(-85);
	hud = createGraphics(width / 10, height / 2);
	hud.background("green");
	hud.fill("white");
	hud.text("Altitude", width / 20, height / 20);
	homeScreen = createGraphics(width, height);
	homeScreen.textAlign(CENTER);
	homeScreen.fill("white");
	homeScreen.textSize(200);
	homeScreen.text("GAME OVER", width / 2, height / 2);
	sight = createGraphics(10, 10);
	sight.noFill();
	sight.stroke("green");
	sight.ellipse(0, 0, 10, 10);
}

function draw() {
	if (alive) {
	background(0);  
	if (!music.isPlaying()) {
		music.play();
	  }
	if (!engine.isPlaying()) {
		engine.play();
	}
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
	translate(0, 0, 0);
	rotateX(180);
	rotateZ(z + 90);
	rotateX(y - 90);
	noStroke();
	texture(f16dark);
	model(f16);
	if (shoot && Math.random() * 1) {
		bulletsX.push(10);
		bulletsY.push(Math.random() * 20);
		bulletsZ.push(altitude);
		bulletsXDir.push(Math.random() * 1);
		bulletsZDir.push(Math.random() * 1);
	}
	pop();
	push();
	translate(2, 0, altitude + (x + 180) / 50 + 24);
	rotateX(90);
	noFill();
	stroke("green");
	strokeWeight(0.5);
	torus(2, 1, 16, 1);
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
		bulletsY[i] -= 100;
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
	if (millis() - timeMillis > 33) {
		if (shoot) {
			shot.play();
		}
		timeMillis = millis()
	}
	positionVar -= 0.1;
	altitude -= ((x + 180) / 100);
	if (altitude <= 10000) {
		alive = false;
	}
	} else {
		if (!tilted) {
			cam.tilt(85);
			tilted = true;
		}
		background(0);
		push();
		translate(0, 0, 0);
		cam.setPosition(0, 0, 1000);
		texture(homeScreen);
		noStroke();
		plane(1200);
		pop();
	}
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