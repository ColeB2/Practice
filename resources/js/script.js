class Cell {
	constructor(x, y, width, state=false) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.state = state;
		this.prevState = state;
		
		this.neighbours = [];
		this.aliveNeighbours = 0;
	}
	
	info() {
		console.log('Cell:')
		console.log(this.x)
		console.log(this.y)
		console.log(this.state)
		console.log(this.prevState)
		console.log(this.neighbours)
		console.log(this.aliveNeighbours)
	}
	
	stateInfo() {
		console.log('Cell:')
		console.log(this.x)
		console.log(this.y)
		console.log(this.state)
		console.log(this.prevState)
		console.log(this.aliveNeighbours)
	}
	
	draw(canvas) {
		if (this.state) {
			canvas.fillRect(this.x*this.width + 1,
			                this.y*this.width + 1,
							this.width-2,
							this.width-2)
		} else {
			canvas.strokeRect(this.x*this.width + 1,
			                  this.y*this.width + 1,
							  this.width-2,
							  this.width-2)
		}	
	}
	
	drawState() {
		// Used for drawing desired grid options
		if (this.state == true) {
			this.state = true;
			this.prevState = true;
		} else {
			this.state = false;
			this.prevState = false;
		}
		
	}
	
	getNeighbours(neighbourhood) {
		const neighboursPosition = [-1, 0, 1];
		for (var j of neighboursPosition) {
			for (var i of neighboursPosition) {
				var validNeighbour = true;
				
				if ((i == 0) && (j == 0)) {
					//can't be neighbours with self
					validNeighbour = false;
				} else if ((this.x + i < 0) || (this.y + j < 0)) {
					//can't be neighbours with cells off board/other side
					validNeighbour = false;
				}  else if ((this.x + i > neighbourhood[0].length-1) || (this.y + j > neighbourhood.length - 1)) {
					//can't be neighbours with cells don't exist/off board
					validNeighbour = false;
				}
				
				if (validNeighbour == true) {
					this.neighbours.push(neighbourhood[this.y + j][this.x + i])
				} 
			}
		}
	}
	
	checkNeighbourState() {
		this.aliveNeighbours = 0;
		for (var cell of this.neighbours) {
			if (cell.prevState == true) {
				this.aliveNeighbours ++;
			}
		}
	}
	

	calculateState() {
		this.checkNeighbourState()
		if (this.state == true) {
			if ((this.aliveNeighbours == 2) || (this.aliveNeighbours == 3)) {
				this.state = true;
			} else {
				this.state = false;
			}
		} else {
			if (this.aliveNeighbours == 3) {
				this.state = true;
			} else {
				this.state = false;
			}
			
		}
	}
	
	
}

/*#######################################################
#########################################################
FUNCTIONS BELOW 
#########################################################
#########################################################
*/

//Board related functions
function createBoard() {
	for (var j = 0; j < canvasHeightCellHeight; j++) {
		var cellRow = [];
	for (var i = 0; i < canvasWidthCellWidth; i ++) {
		var myCell = new Cell(i, j, cellWidth, false);
		cellRow.push(myCell)
		}
		cellArray.push(cellRow)
	}	
}


//set cell neighbours
function setCellNeighbours() {
	cellArray.forEach(function(row) {
		row.forEach(function(cell) {
			cell.getNeighbours(cellArray)
		})
	})
}
//draw and display all info --> put in while loop
function initialUpdate() {
	cellArray.forEach(function(row) {
		row.forEach(function(cell) {
			cell.draw(myCanvasCtx);
			cell.info();
		})
	})
}


function calcState() {
	cellArray.forEach(function(row) {
		row.forEach(function(cell) {
			cell.calculateState();
		})
	})
}

function setPrevState() {
	cellArray.forEach(function(row) {
		row.forEach(function(cell) {
			cell.prevState = cell.state;
		})
	})
}

function boardUpdate() {
	cellArray.forEach(function(row) {
		row.forEach(function(cell) {
			cell.draw(myCanvasCtx)
		});
	});
}
//Main Loop Functions
function updateGame() {
	//clear canvas
	myCanvasCtx.clearRect(0,0, myCanvas.width, myCanvas.height);
	// calc state
	calcState();
	//sets previous state
	setPrevState();
	boardUpdate();
}

function pauseLoop() {
	isRunning = !isRunning;
	window.requestAnimationFrame(mainLoop);
	console.log(isRunning)
}

function mainLoop() {
	
	if (isRunning) {
		updateGame();
		setTimeout( function() {
		window.requestAnimationFrame(mainLoop);
	}, 300);
		
	}	
}


//initials:
// Main
var isRunning = true;
var myCanvas = document.getElementById("myCanvas");
var myCanvasCtx = myCanvas.getContext('2d');
var myCanvasLeft = myCanvas.offsetLeft + myCanvas.clientLeft
var myCanvasTop = myCanvas.offsetTop + myCanvas.clientTop



var canvasWidth = myCanvasCtx.canvas.clientWidth;
var canvasHeight = myCanvasCtx.canvas.clientHeight;
var cellWidth = 50;
var canvasWidthCellWidth = canvasWidth / cellWidth;
var canvasHeightCellHeight = canvasHeight / cellWidth;

var cellArray = [];

createBoard();
setCellNeighbours();

cellArray[4][3].state = true;
cellArray[4][4].state = true;
cellArray[4][5].state = true;

cellArray[7][7].state = true;
cellArray[8][8].state = true;
cellArray[7][8].state = true;
cellArray[8][7].state = true;

//click event:
myCanvas.addEventListener('click', function(event) {
	var x = event.pageX - myCanvasLeft;
	var y = event.pageY - myCanvasTop;
	
	//colision
	cellArray.forEach(function(row) {
		row.forEach(function(cell) {
			if (y > cell.y && y < cell.y + cell.width
		    && x > cell.x && x < cell.x + cell.width) {
				alert('clicked an element');
				console.log('clicked elem')
			}
		});
		
	});
	
}, false);

console.log("------------FOREACH HERE")
cellArray.forEach(function(element) {
	element.forEach(function(cell) {
		console.log(cell)
	})
})


setPrevState();
initialUpdate();
window.requestAnimationFrame(mainLoop);


