class Cell {
	constructor(x, y, width, state=false) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.state = state;
	}
	
	draw(canvas) {
		if (this.state) {
			canvas.fillRect(this.x, this.y, this.width, this.width)
		} else {
			canvas.strokeRect(this.x, this.y, this.width, this.width)
		}
		
	}
}



var myCanvas = document.getElementById("myCanvas");
var myCanvasCtx = myCanvas.getContext('2d');
var myCell = new Cell(0, 0, 50, false);
var myCell2 = new Cell(50, 0, 50, true);


myCell.draw(myCanvasCtx)
myCell2.draw(myCanvasCtx)