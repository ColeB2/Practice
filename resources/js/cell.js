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
		canvas.fillStyle = this.state? "#89FB92" : "#343A40";
		canvas.fillRect(this.x*this.width + 1,
			                this.y*this.width + 1,
							this.width-2,
							this.width-2)
	}
	
	
	drawState() {
		// Used for drawing desired grid options
		if (this.state) {
			this.state = false;
			this.prevState = false;
		} else {
			this.state = true;
			this.prevState = true;
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