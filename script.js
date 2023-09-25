// Code adapted from https://www.ginifab.com/feeds/cm_to_inch/actual_size_ruler.html
const r = document.querySelector(':root');
function calculatePPI(){
	let iHeight=screen.height, iWidth=screen.width;
	if (navigator.userAgent.match(/iPhone/i)) { // iPhone
		if (iWidth === 375 && iHeight === 667){ // iPhone 6,7,8
			return 163;
		} else if (iWidth === 375 && iHeight === 812) { // iPhone X,XS,11 Pro
			return 152.7;
		} else if (iWidth === 414 && iHeight === 896) { // iPhone 11
			return 163;
		} else if (iWidth === 390 && iHeight === 844) { // iPhone 12, 13, 14
			return 153.3;
		} else if (iWidth === 428 && iHeight === 926) { // iPhone 12 Pro Max, 13 Pro Max, 14 Plus
			return 152.7;
		} else if (iWidth === 430 && iHeight === 932) { // iPhone 14 Pro Max
			return 153.3;
		} else if (iWidth === 393 && iHeight === 852) { // iPhone 14 Pro
			return 153.3;
		} else { // iPhone 4/4s, iPhone 6+/6s+/7+/8+
			return 163;
		}
	} else if (navigator.userAgent.match(/Macintosh/i)) { // Macbook air
		if (iWidth === 810 && iHeight === 1080) { // iPad 7/8/9 gen
			return 132;  
		} else {
			return 127.7;
		}
	} else if (navigator.userAgent.match(/Android.*Pixel/i)) { // Google Pixel
		if (navigator.userAgent.match(/Pixel 5/i)){
			return 157;
		} else if (navigator.userAgent.match(/Pixel 4 XL/i)){
			return 153;
		} else if (navigator.userAgent.match(/Pixel 4/i)){
			return 161;
		} else {
			return 160;
		}
	} else if (navigator.userAgent.match(/Android.*SAMSUNG/i)) { // Samsung
		return 141;
	} else if (screen.width<500 || screen.height<500) {
		return 122.6;
	} else {
		if (screen.width === 1440 || screen.height === 900) {
			return 89.4;
		} else {
			return 127.01;
		}
	}
}
let ppi = calculatePPI();
r.style.setProperty('--ppi', ppi + "px");

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

		if (posX >= ppi*200) {
			ruler.style.transform = `translateX(-${ppi*200-1}px)`;
			message.innerText = "You missed it!";
			endGame();
		}
	}, 1)

	// Fade out numbers
	ruler.dataset.start = 1;
}
function endGame() {
	stop.innerHTML = (posX/ppi).toFixed(2) + "in";
	score.innerHTML = Math.abs(120 - posX/ppi).toFixed(2) + "in";
	outro.style.display = "flex";
	game = false;
	ruler.dataset.start = 0;
	clearInterval(increaseLoop);
	clearInterval(loop);
	increment = 0.1;
	posX = 0;
}