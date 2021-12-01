import {Board} from './board.js'
import './constants.js'

class Main {
	constructor () {
		this.Board = new Board(BOARD_WIDTH, BOARD_HEIGHT)
		this.isRunning = false;
		this.delay = DELAY;	
	}
	
	initializeBoard() {
		this.Board.createBoard();
		this.Board.setCellNeighbours();
		
		const gameBoard = this.Board.board
		
		//Mouse Controls
		CANVAS.addEventListener('click', (event) => {
			const x = event.pageX - CANVAS_LEFT;
			const y = event.pageY - CANVAS_TOP;
			
			gameBoard.forEach((row) => {
				row.forEach((cell) => {
					if (y > cell.y*cell.width && y < cell.y*cell.width + cell.width
					&& x > cell.x*cell.width && x < cell.x*cell.width + cell.width) {
						cell.drawState();
						CTX.clearRect(0,0, CANVAS_WIDTH, CANVAS_HEIGHT);
						this.Board.boardUpdate(CTX);
					}
				})
			})
		}, false);
	    
		this.Board.setPrevState();
		this.Board.boardUpdate(CTX);
	}
	
	updateGame() {
		CTX.clearRect(0,0, CANVAS_WIDTH, CANVAS_HEIGHT);
		this.Board.nextState();
		this.Board.setPrevState();
		this.Board.boardUpdate(CTX);
	}
	
	
	runGame() {
		const self = this
		
		function mainLoop() {
			if (self.isRunning) {
				self.updateGame();
				setTimeout( () => {
					window.requestAnimationFrame(mainLoop);
				}, self.delay);
			}
		}
		window.requestAnimationFrame(mainLoop)
	}
}


const mainGame = new Main();
mainGame.initializeBoard();
const pauseButton = document.getElementById('pause')
const rangeSlider = document.getElementById('myRange');
const output = document.getElementById('sliderValue');
output.innerHTML = rangeSlider.value;
	
rangeSlider.oninput = function() {
	output.innerHTML = this.value;
	mainGame.delay = this.value;
}
	
function pauseLoop() {
	if (mainGame.isRunning) {
		pauseButton.innerText = 'Start';
		pauseButton.classList.remove('button-paused')
	} else {
		pauseButton.innerText = 'Pause';
		pauseButton.classList.add('button-paused')
	}
	mainGame.isRunning = !mainGame.isRunning;
	mainGame.runGame()
}
	
function resetBoard() {
	document.getElementById('reset')
	mainGame.Board.resetState()
	mainGame.updateGame();
}
	
function randomBoard() {
	mainGame.Board.randomState();
	mainGame.updateGame();
}

function startLoop() {
	
}

console.log("runGame")
mainGame.runGame();
	
}





