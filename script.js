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
	f16 = loadModel("f16.obj", true)
	f16dark = loadImage("f16dark.jpeg");
	landTexture = loadImage("land.jpg");
	backgroundImg = loadImage("background.jpg");  
	gotham = loadFont("Gotham-XLight.otf");
	shot = loadSound("shot.mp3");
	engine = loadSound("engine.mp3");
	music = loadSound("music.mp3");
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	textFont(gotham);
	ellipseMode(CENTER);
	shot.setVolume(0.3);
	music.setVolume(0.5);
	engine.setVolume(0.5);
	game = createGraphics(width / 2, height / 2, WEBGL);
	game.angleMode(DEGREES);
	cam = game.createCamera();
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
	game.background(0);  
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
	game.push();
	game.translate(0, 0, 0);
	game.rotateX(positionVar);
	game.texture(landTexture);
	game.sphere(10000, 100, 100);
	game.pop();
	game.push();
	game.translate(0, 0, altitude);
	game.translate(0, 0, 0);
	game.rotateX(180);
	game.rotateZ(z + 90);
	game.rotateX(y - 90);
	game.noStroke();
	game.texture(f16dark);
	game.model(f16);
	if (shoot && Math.random() * 1) {
		bulletsX.push(10);
		bulletsY.push(Math.random() * 20);
		bulletsZ.push(altitude);
		bulletsXDir.push(Math.random() * 1);
		bulletsZDir.push(Math.random() * 1);
	}
	game.pop();
	/*game.push();
	game.translate(2, 0, altitude + (x + 180) / 50 + 24);
	game.rotateX(90);
	game.noFill();
	game.stroke("green");
	game.strokeWeight(0.5);
	game.torus(2, 1, 16, 1);
	game.pop();*/
	game.push();
	game.translate(0, -8000, altitude);
	game.texture(backgroundImg);
	game.box(10000, 10000);
	game.pop();
	for (var i = 0; i < bulletsX.length; i++) {
		game.push();
		game.translate(bulletsX[i], bulletsY[i], bulletsZ[i]);
		game.rotateX(90);
		game.fill("white");
		game.stroke("white");
		game.cylinder(20, 1, 1, 1);
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
		game.pop();
	}
	game.translate(0, 0, 0);
	cam.setPosition(0, 210, altitude + 25);
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
	if (altitude <= 10015) {
		alive = false;
	}
	image(game, 0, 0, width, height);
	//noFill();
	stroke("green");
	strokeWeight(1);
	ellipse(width / 2, height / 2, 10, 10);
	fill("white");
	textSize(100);
	text("Altitude: " + Math.round(altitude), 500, 200);
	} else {
		background(0);
		textAlign(CENTER);
		text("GAME OVER", width / 2, height / 2);
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