class Board {
	constructor(width=10, height=10) {
		this.width = width;
		this.height = height;
		
		this.generation = 0
		this.board = [];	
	}
		
	
	createBoard() {
		for (var j = 0; j < this.height; j++) {
			var row = [];
			for (var i = 0; i < this.width; i++) {
				var cell = new Cell(i, j, CELL_WIDTH, false);
				//50 -- cell width --> import a const for it?
				row.push(cell);
			}
			this.board.push(row);
		}
	}
	
	setCellNeighbours() {
		var neighbourhood_board = this.board
		this.board.forEach((row) => {
			row.forEach((cell) => {
				cell.getNeighbours(this.board);
			})
		})
	}
	
	
	setPrevState() {
		this.board.forEach((row) => {
			row.forEach((cell) => {
				cell.prevState = cell.state;
			})
		})
	}
	
	resetState() {
		this.board.forEach((row) => {
			row.forEach((cell) => {
				cell.state = false;
				cell.prevState = false;
			})
		})
	}
	
	randomState() {
		this.board.forEach((row) => {
			row.forEach((cell) => {
				var randomBool = Math.random() < 0.5
				cell.state = randomBool;
				cell.prevState = randomBool;
			})
		})
	}
	
	
	nextState() {
		this.board.forEach((row) => {
			row.forEach((cell) => {
				cell.calculateState();
			})
		})
	}
		
	boardUpdate(canvasContext) {
		this.board.forEach((row) => {
			row.forEach((cell) => {
				cell.draw(canvasContext);
			});
		});
	}
}