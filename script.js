// MY COMPUTER SPECS:
// width: 1728px
// height: 1117px
// real diagonal: 16.2in
// ppi: 127.01
const r = document.querySelector(':root');
const myRatio = 1728/1117;
const myDPI = 127.01;
const userRatio = screen.width/screen.height;
const diffRatio = myRatio - userRatio;
// const adjustedDPI = myDPI*(1+diffRatio);
const adjustedDPI = myDPI;
r.style.setProperty('--ppi', adjustedDPI + "px");

// Generate ruler
let ruler = document.querySelector('.ruler');
let temp = '';
for (let i=0; i<300; i++) {
	temp += `
		<div class="inch">
			<div class="line"></div>
			<div class="label">${i+1}</div>
		</div>
	`
}
ruler.innerHTML = temp;

// Intro animation
let title = document.querySelector('h1');
let intro = document.querySelector('.intro');
let introLetters = 6;
let introDirection = 1;
let introLoop = setInterval(() => {
	title.innerText = "Zoo" + "o".repeat(introLetters) + "m"
	introLetters += introDirection;
	if (introLetters == 12 || introLetters == 0) {
		introDirection *= -1;
	}
}, 50)

// Game controls
let game = false;
document.addEventListener('keypress', (e) => {
	if (e.key = "SPACE") {
		if (game == false) {
			startGame();
		} else {
			endGame();
		}
	}
})
document.addEventListener('click', (e) => {
	if (game == false) {
		startGame();
	} else {
		endGame();
	}
})

// Main game functions
let outro = document.querySelector('.outro');
let message = document.querySelector('#message');
let stop = document.querySelector('#stop');
let score = document.querySelector('#score');
let loop, increaseLoop;
let increment = .1;
let posX = 0;
function startGame() {
	intro.style.display = 'none';
	outro.style.display = "none";
	message.innerText = "Game over!";
	clearInterval(introLoop);
	ruler.style.transform = `translateX(0)`;
	game = true;

	// Start loops
	increaseLoop = setInterval(() => {
		increment += 0.1;
	}, 500)
	loop = setInterval(() => {
		posX += increment;
		ruler.style.transform = `translateX(-${posX}px)`;

		if (posX >= adjustedDPI*200) {
			ruler.style.transform = `translateX(-${adjustedDPI*200-1}px)`;
			message.innerText = "You missed it!";
			endGame();
		}
	}, 1)

	// Fade out numbers
	ruler.dataset.start = 1;
}
function endGame() {
	stop.innerHTML = (posX/adjustedDPI).toFixed(2) + "&quot;";
	score.innerHTML = Math.abs(120 - posX/adjustedDPI).toFixed(2) + "&quot;";
	outro.style.display = "flex";
	game = false;
	ruler.dataset.start = 0;
	clearInterval(increaseLoop);
	clearInterval(loop);
	increment = 0.1;
	posX = 0;
}