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
	
	draw(canvas) {
		if (this.state) {
			canvas.fillRect(this.x*this.width + 1, this.y*this.width + 1, this.width-2, this.width-2)
		} else {
			canvas.strokeRect(this.x, this.y, this.width, this.width)
		}	
	}
	
	drawState() {
		// Used for drawing desired grid options
		if (this.state == true) {
			this.state = 1
			this.prevState = 1
		} else {
			this.state = 0
			this.prevState = 0
		}
		
	}
	
	getNeighbours(neighbourhood, neighbours=[-1,0,1]) {
		for (var j of neighbours) {
			for (var i of neighbours) {
				var validNeighbour = true;
				console.log(j)
				console.log(i)
				console.log(validNeighbour)
				
				if ((i == 0) && (j == 0)) {
					//can't be neighbours with self
					validNeighbour = false;
				} else if ((this.x < 0) || (this.y + j < 0)) {
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
		for (var cell in this.neighbours) {
			if (cell.prev_state == true) {
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


// Main
var myCanvas = document.getElementById("myCanvas");
var myCanvasCtx = myCanvas.getContext('2d');

var canvasWidth = myCanvasCtx.canvas.clientWidth;
var canvasHeight = myCanvasCtx.canvas.clientHeight;
var cellWidth = 50;
var canvasWidthCellWidth = canvasWidth / cellWidth;
var canvasHeightCellHeight = canvasHeight / cellWidth;

var cellArray = [];


//Creating Board of cells -- cellArray
for (var j = 0; j < canvasHeightCellHeight; j++) {
	var cellRow = [];
	for (var i = 0; i < canvasWidthCellWidth; i ++) {
		var myCell = new Cell(i, j, cellWidth, true);
		cellRow.push(myCell)
		
	}
	cellArray.push(cellRow)
}

//set cell neighbours
for (var j = 0; j < cellArray.length; j++) {
	for (var i = 0; i < cellArray[j].length; i++) {
		console.log(cellArray[i][j])
		cellArray[i][j].getNeighbours(cellArray)
	}
}

cellArray[2][3].state = false;
//var myCell = new Cell(0, 0, 50, false);
//var myCell2 = new Cell(50, 0, 50, true);

//myCell.draw(myCanvasCtx)
//myCell2.draw(myCanvasCtx)

//draw and display all info --> put in while loop
for (var j = 0; j < cellArray.length; j++) {
	for (var i= 0; i < cellArray[j].length; i++) {
		cellArray[i][j].draw(myCanvasCtx);
		cellArray[i][j].info();
	}
}

