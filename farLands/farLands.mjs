
/*******************************************************/
// My Game   Far Lands
// Written by William Kan
// Date: who knows its been too long help
/*******************************************************/
/*******************************************************/

//import {
//	fb_write
//} from './fb_io.mjs';
/*******************************************************/
//var container
/*******************************************************/
let gameState = "intro";
let startImage;
let startText;
let spaceshipModel;
let asteroidModel;
let coinModel;
let banner;
let clickedCounter = 0;
let asteroidSpawingLocationY = 0;
let borderSpawned = false;
let spaceshipSpawned = false;
let asteroidSpawningChance = 0;
let coinSpawningChance = 0;
let asteroidSpawned = false;
let score = 0;
let lives = 5
let checkLives = true
let coinSpawingLocationY;
let gameStateChanged = 0;
let particleMovementX;
let particleMovementY;
let particlesSpawningAmount;
let particlesSpawningPart;
let playtext1;
let playtext2;
let UID;
let userName;
var once = 0;

/*******************************************************/
//const container
/*******************************************************/
const ASTEROIDSPAWNINGCHANCEPARAMETER = 3;
const ASTEROIDSPEED = -10;
const ASTEROIDGOESSTRAIGHT = 0;
const CLICKCOUNTERINCREASE = 0.5;
const COINSPAWNINGCHANCEPARAMETER = 2;

/*******************************************************/
function setup() {
	console.log("setup: ");
	cnv = new Canvas(windowWidth - 4, windowHeight - 4);
	asteroidGroup = new Group();
	coinGroup = new Group();
	if (gameState == "intro") {
		UID = sessionStorage.getItem("UID");
		userName = sessionStorage.getItem("userName");
		if (UID == null) {
			window.location.replace("../registration/registration.html");
		}
		background('#0e001b');
		startImage = new Sprite(900, 500, 200, 400, 's');
		startImage.image = startText;
		startBanner = new Sprite(900, 200, 400, 60, 's')
		startBanner.image = banner;
	}
	else if (gameState == "play") {
		startImage = null;
		startBanner = null;




	}
	else if (gameState == "lose") {
	}
}

/*******************************************************/
// draw()
/*******************************************************/
function draw() {
	
	playState();
}
/*******************************************************/
// functions()
/*******************************************************/
// playstate()
// Called by draw()
// Holds the code for intro screen, instructions screen, play screen, and lose screen.
//
function playState() {
	if (gameState == "intro") {
		background('#0e001b');
		gameStateChanger1();
	}
	else if (gameState == "instructions") {
		background('#0e001b');
		startImage.remove()
		startBanner.remove()
		instructionsText();
		gameStateChanger2();

	}
	else if (gameState == "play") {

		background('#0e001b');

		//* Coding for the spaceship*//
		info();


		//** Coding for Bodrers **/
		if (borderSpawned == false) {
			borders();
			borderSpawned = true
		}
		spaceshipCodeContainer();
		asteroidCodeContainer();
		updateParticleAmount();
		
		spawnCoin();
		spaceshipTouchesCoin();
		gameStateChanger3();






	}
	else if (gameState == "lose") {
		background('#0e001b');
		loseScreenText();
		if (once == 0 ) {
			sessionStorage.setItem("score", score);
			fb_writeFarLands()
			once = 1;
		}
		home();
		
		



	}
}
//******************* */
// preload()
// Called by N/A
// loads the images for sprites.
//******************* */
function preload() {
	startText = loadImage('../assets/start_image.png');
	spaceshipModel = loadImage('../assets/spaceshipImage.gif')
	asteroidModel = loadImage('../assets/asteroid.png');
	coinModel = loadImage('../assets/coin.png')
	banner = loadImage('../assets/banner.png')



}

//******************* */
// mousePressed()
// Called by N/A
// Adds to the click counter which is used to cha7nge the gameState
// This website helped https://processing.org/reference/mousePressed.html
//******************* */
function mousePressed() {
	if (mousePressed) {
		clickedCounter = clickedCounter + CLICKCOUNTERINCREASE;
	}
}


//******************* */
// spaceshipCodeContainer()
// Called by gameState
// Holds all of the code for the spaceShip sprite
//******************* */
function spaceshipCodeContainer() {
	if (spaceshipSpawned == false) {
		spaceship = new Sprite(200, 400, 200, 80, 'd');
		spaceship.image = spaceshipModel;
		spaceship.scale = 0.5;
		spaceship.image.offset.y = 50;
		spaceship.image.offset.x = -40;
		spaceshipSpawned = true;
	}
	spaceship.rotationSpeed = 0;
	spaceship.rotation = 0;
	asteroidGroup.rotationSpeed = 0;
	asteroidGroup.rotation = 0;
	spaceshipMovement();
	spaceshipCrashesAsteroid();
}

//******************* */
// asteroidCodeContainer()
// Called by gameState
// Holds all of the code for the asteroid sprites
//******************* */
function asteroidCodeContainer() {
	asteroidSpawningChance = random(1, 100);
	asteroidSpawingLocationY = random(1, windowHeight);

	if (asteroidSpawned == true) {
		asteroidMovement();
	}
	if (ASTEROIDSPAWNINGCHANCEPARAMETER > asteroidSpawningChance) {
		asteroid = new Sprite(windowWidth + 200, asteroidSpawingLocationY, 170, 'd')
		asteroidGroup.add(asteroid)
		asteroidSpawned = true;
		asteroid.image = asteroidModel;
		asteroid.image.offset.x = 130;
		noSmooth();
	}
	asteroidDeleteParameter();
}



//******************* */
// spaceshipCodeContainer()
// Called by spaceshipCodeContainer
// This is the code that moves the sprite in it's respective directions using keys WASD
//******************* */
function spaceshipMovement() {
	if (kb.pressing('left')) {
		spaceship.vel.x = -7;
	}

	else if (kb.pressing('right')) {
		spaceship.vel.x = 7;
	}

	if (kb.released('left')) {
		spaceship.vel.x = 0;
	}

	else if (kb.released('right')) {
		spaceship.vel.x = 0;
	}
	if (kb.pressing('up')) {
		spaceship.vel.y = -7;

	}
	else if (kb.pressing('down')) {
		spaceship.vel.y = 7;
	}
	if (kb.released('up')) {
		spaceship.vel.y = 0;
	}

	else if (kb.released('down')) {
		spaceship.vel.y = 0;
	}
}

//******************* */
// asteroidMovement()
// Called by asteroidCodeContainer
// Sets the speed and direction of which the asteroids move
//******************* */
function asteroidMovement() {
	asteroidGroup.vel.x = ASTEROIDSPEED;
	asteroidGroup.vel.y = ASTEROIDGOESSTRAIGHT;
}

//******************* */
// borders()
// Called by gameState()
// spawns the boundreys so that the spaceship can't leave the play area.
//******************* */
function borders() {
	// north wall 
	north = new Sprite(windowWidth / 2, 0, windowWidth*5, 3, 's')
	north.color = 'red'

	// south wall
	south = new Sprite(windowWidth / 2, windowHeight, windowWidth*5, 3, 's')
	south.color = 'red'

	// west wall
	west = new Sprite(-400, windowHeight / 2, 3, windowHeight, 's')
	west.color = 'red'
	
	// east wall
	east = new Sprite(windowWidth + 400, windowHeight / 2, 3, windowHeight, 's')
	east.color = 'red'
}



//******************* */
// asteroidDeleteParameter()
// Called by asteroidCodeContaier()
// checks to see if any asteroid has collided with the west wall.
//******************* */
function asteroidDeleteParameter() {
	asteroidGroup.collides(west, asteroidDelete);
}

//******************* */
// spaceshipCodeContainer()
// Called by N/A
// An asteroid has touched the west delete wall and is now being removed
//******************* */
function asteroidDelete(_west, _asteroid) {
	_asteroid.remove();
}

//******************* */
// spaceshipCrashesAsteroid()
// Called by spaceshipCodeContainer()
// Checks to see if the spaceship has crashed into any asteroids
//******************* */
function spaceshipCrashesAsteroid() {
	asteroidGroup.collides(spaceship, spaceshipHit);
}

//******************* */
// spaceshipHit()
// Called by N/A
// The spaceship has crashed into an asteroid. lives go down and asteroid is removed.
//******************* */
function spaceshipHit(_asteroid, _spaceship) {
	_asteroid.remove();
	console.log("contact made");
	lives--
	crashParticles(particlesSpawningPart);
}

//******************* */
// spaceshipTouchesCoin()
// Called by spaceshipCodeContainer()
// Checks to see if the spaceship has collided with a coin
//******************* */
function spaceshipTouchesCoin() {
	coinGroup.collides(spaceship, spaceshipCollectCoin);
}

//******************* */
// spaceshipCollectCoin()
// Called by spaceshipCodeContainer()
// The spaceship has collided with a coin. That specific coin is removed and score goes up by 1.
//******************* */
function spaceshipCollectCoin(_coin, _spaceship) {
	_coin.remove();
	console.log("coin collected");
	score++
	sessionStorage.setItem("score", score);
	
}
/*****************************************************/
// spawnCoin()
// Called by the draw loop
// Spawns the coins
// chatgpt used to find 1 error
/*****************************************************/
function spawnCoin() {
	coinSpawningChance = random(1, 150);
	coinSpawingLocationY = random(1, windowHeight);
	if (COINSPAWNINGCHANCEPARAMETER > coinSpawningChance) {
		coin = new Sprite(windowWidth + 20, coinSpawingLocationY, 20, 'k')
		coin.image = coinModel;
		noSmooth();
		console.log("coin spawned");
		coinGroup.add(coin);
		coinMovement();

	}

}

/*****************************************************/
// coinMovement()
// Called by the spawnCoin()
// sets the speed for the coins
/*****************************************************/
function coinMovement() {
	coinGroup.vel.x = -10;
}


/*****************************************************/
// info()
// Called by playState
// Shows the lives and score that the player has
//

/*****************************************************/
function info() {
	fill("#cbc83c");
	playtext1 = "Lives " + lives;
	playtext2 = "Score " + score;
	text(playtext1, 50, 50);
	text(playtext2, 50, 100);
}

//******************* */
// crashParticles()
// Called by spaceshipHit()
// spawns particles. The amount of particles spawned is dependent on the amount of lives that the player has.
//******************* */
function crashParticles(_particles) {
	particlesSpawningAmount = _particles * 5
	for (i = 0; i < particlesSpawningAmount; i++) {
		particlesGroup = new Group();
		particles = new Sprite(spaceship.x, spaceship.y, 10, 10, 'n');
		particles.color = "red";
		particleMovementX = random(-5, 5);
		particleMovementY = random(-5, 5);
		particles.vel.x = particleMovementX;
		particles.vel.y = particleMovementY;
		particles.life = 30;
		particlesGroup.add(particles);
	}
}

//******************* */
// updateParticleAmount()
// Called by crashParticles()
// Makes sure that the amount of particles that are spawned are greater when you have fewer lives
//******************* */
function updateParticleAmount() {
	if (lives == 1) {
		particlesSpawningPart = lives + 4;
	} else if (lives == 2) {
		particlesSpawningPart = lives + 2;
	} else if (lives == 3) {
		particlesSpawningPart = lives;
	} else if (lives == 4) {
		particlesSpawningPart = lives - 2;
	} else if (lives == 5) {
		particlesSpawningPart = lives - 4;
	}
}

//******************* */
// loseScreenText()
// Called by gameState()
// Shows text at lose screen to show that the player has lost and to tell the player their score
//******************* */
function loseScreenText() {
	fill("#cbc83c");
	textSize(30);
	text("YOUR SHIP HAS BEEN DESTROYED", windowWidth / 2 - 300, 400);
	text("SCORE: " + score, windowWidth / 2 - 300, 440);
	textSize(10);
	text("refresh the page to try again", windowWidth / 2 - 250, 800);
	text("or press ..t.. to return", windowWidth / 2 - 250, 810 );
}

//******************* */
// instructionsText()
// Called by gameState()
// Explain to the player how to play the game.
//******************* */
function instructionsText() {
	fill("#cbc83c");
	textSize(70);
	text("INSTRUCTIONS", windowWidth/2 -280, 200);
	textSize(30);
	text("Use W, A, S, and D Or The Arrow Keys To Move Your Spaceship", windowWidth/2 -300, 400) ;
	text("Collect Coins To Increase Your Score", windowWidth/2 -300, 440);
	text("Dodge The Asteroids", windowWidth/2 -300, 480);
	text("When Hit By An Asteroid You lose A Life", windowWidth/2 -300, 520);
	text("You Have 5 Lives", windowWidth/2 -300, 560);
	text("The Game Ends When You Have No Lives Left", windowWidth/2 -300, 600)
	text("Click To Continue", windowWidth/2 -300, 680);
}
//******************* */
// gameStateChanger1()
// Called by gameState()
// Changes the gameState from start to instructions
//******************* */
function gameStateChanger1() {
	if (clickedCounter == 1) {
		gameState = "instructions";
	}
}

//******************* */
// gameStateChanger2()
// Called by gameState()
// Changes the gameState from instructions to play 
//******************* */
function gameStateChanger2() {
	if (clickedCounter == 2) {
		gameState = "play";
	}
}
//******************* */
// gameStateChanger3()
// Called by gameState()
// Changes the gameState from play to lose
//******************* */
function gameStateChanger3() {
	if (gameStateChanged < 1) {
		if (lives <= 0) {
			gameState = "lose";
			gameStateChanged = 1;
			spaceship.remove();
			asteroidGroup.remove();
			coinGroup.remove();
		}
	}
}

function submissionPage() {
var button = document.createElement('button');
button.innerHTML = 'Click Me';
button.id = 'myButton';
button.addEventListener('click', function() {
  alert('Button Clicked!');
}); //help gotten from online

}
function home() {
	if (kb.pressing('t')) {
		window.location.replace("../index.html");
	}
}
/**************************************************** *
*******************************************************/
//  END OF APP
/*******************************************************
 * *****************************************************/