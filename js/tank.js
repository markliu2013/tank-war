/**
 * Class Tank
 * @param header
 * @param direction
 * @constructor
 */
function Tank(header, direction) {
	this.header = header;
	this.direction = direction;
	//根据头部和方向计算坦克所占的格子
	this.getDataArr = function() {
		var dataArr = [this.header];
		if (this.direction == 37) { //left
			dataArr.push([this.header[0]+1, this.header[1]-1]);
			dataArr.push([this.header[0]+1, this.header[1]]);
			dataArr.push([this.header[0]+1, this.header[1]+1]);
			dataArr.push([this.header[0]+2, this.header[1]-1]);
			dataArr.push([this.header[0]+2, this.header[1]+1]);
		} else if (this.direction == 38) { //up
			dataArr.push([this.header[0]-1, this.header[1]+1]);
			dataArr.push([this.header[0], this.header[1]+1]);
			dataArr.push([this.header[0]+1, this.header[1]+1]);
			dataArr.push([this.header[0]-1, this.header[1]+2]);
			dataArr.push([this.header[0]+1, this.header[1]+2]);
		} else if (this.direction == 39) { //right
			dataArr.push([this.header[0]-1, this.header[1]-1]);
			dataArr.push([this.header[0]-1, this.header[1]]);
			dataArr.push([this.header[0]-1, this.header[1]+1]);
			dataArr.push([this.header[0]-2, this.header[1]-1]);
			dataArr.push([this.header[0]-2, this.header[1]+1]);
		} else if (this.direction == 40) { //down
			dataArr.push([this.header[0]-1, this.header[1]-1]);
			dataArr.push([this.header[0], this.header[1]-1]);
			dataArr.push([this.header[0]+1, this.header[1]-1]);
			dataArr.push([this.header[0]-1, this.header[1]-2]);
			dataArr.push([this.header[0]+1, this.header[1]-2]);
		}
		return dataArr;
	}
	this.checkValidation = function() {
		if (this.direction == 37) { //left
			if (this.header[0]+2 > gridColsNum || this.header[0] < 1) {
				return false;
			} else if (this.header[1] < 2 || this.header[1] > gridRowsNum-1 ) {
				return false;
			}
		} else if (this.direction == 38) { //up
			if (this.header[1]+2 > gridRowsNum || this.header[1] < 1) {
				return false;
			} else if (this.header[0] < 2 || this.header[0] > gridColsNum-1) {
				return false;
			}
		} else if (this.direction == 39) { //right
			if (this.header[0] < 3 || this.header[0] > gridColsNum ) {
				return false;
			} else if (this.header[1] < 2 || this.header[1] > gridRowsNum-1 ) {
				return false;
			}
		} else if (this.direction == 40) { //down
			if (this.header[1] < 3 || this.header[1] > gridRowsNum) {
				return false;
			} else if (this.header[0]<2 || this.header[0]>gridColsNum-1) {
				return false;
			}
		}
		return true;
	}
	this.draw = function() {
		var dataArr = this.getDataArr();
		for(var i=0; i<dataArr.length; i++) {
			dome.get("#tank-grid .row:nth-child("+dataArr[i][1]+") .col:nth-child("+dataArr[i][0]+")").addClass("on tank");
		}
	}
	this.removeDraw = function() {
		var dataArr = this.getDataArr();
		for(var i=0; i<dataArr.length; i++) {
			dome.get("#tank-grid  .row:nth-child("+dataArr[i][1]+") .col:nth-child("+dataArr[i][0]+")").removeClass("on").removeClass("tank");
		}
	}
	this.moveLeft = function() {
		var preHeader = this.header;
		var preDirection = this.direction;
		this.removeDraw();
		this.direction = 37;
		if (preDirection == 37) {
			this.header = [preHeader[0]-1, preHeader[1]];
		} else if (preDirection == 39) {
			this.header = [preHeader[0]-2, preHeader[1]];
		} else if (preDirection == 38) {
			this.header = [preHeader[0]-1, preHeader[1]+1];
		} else if (preDirection == 40) {
			this.header = [preHeader[0]-1, preHeader[1]-1];
		}
		if (!this.checkValidation()) {
			this.header = preHeader;
		}
		this.draw();
	}
	this.moveUp = function() {
		var preHeader = this.header;
		var preDirection = this.direction;
		this.removeDraw();
		this.direction = 38;
		if (preDirection == 38) {
			this.header = [preHeader[0], preHeader[1]-1];
		} else if (preDirection == 40) {
			this.header = [preHeader[0], preHeader[1]-2];
		} else if (preDirection == 37) {
			this.header = [preHeader[0]+1, preHeader[1]-1];
		} else if (preDirection == 39) {
			this.header = [preHeader[0]-1, preHeader[1]-1];
		}
		if (!this.checkValidation()) {
			this.header = preHeader;
		}
		this.draw();
	}
	this.moveRight = function() {
		var preHeader = this.header;
		var preDirection = this.direction;
		this.removeDraw();
		this.direction = 39;
		if (preDirection == 39) {
			this.header = [preHeader[0]+1, preHeader[1]];
		} else if (preDirection == 37) {
			this.header = [preHeader[0]+2, preHeader[1]];
		} else if (preDirection == 38) {
			this.header = [preHeader[0]+1, preHeader[1]+1];
		} else if (preDirection == 40) {
			this.header = [preHeader[0]+1, preHeader[1]-1];
		}
		if (!this.checkValidation()) {
			this.header = preHeader;
		}
		this.draw();
	}
	this.moveDown = function() {
		var preHeader = this.header;
		var preDirection = this.direction;
		this.removeDraw();
		this.direction = 40;
		if (preDirection == 40) {
			this.header = [preHeader[0], preHeader[1]+1];
		} else if (preDirection == 38) {
			this.header = [preHeader[0], preHeader[1]+2];
		} else if (preDirection == 37) {
			this.header = [preHeader[0]+1, preHeader[1]+1];
		} else if (preDirection == 39) {
			this.header = [preHeader[0]-1, preHeader[1]+1];
		}
		if (!this.checkValidation()) {
			this.header = preHeader;
		}
		this.draw();
	}
	this.fire = function() {
		var bulletHeader = null;
		switch (this.direction) {
			case 37:
				bulletHeader = [this.header[0]-1,this.header[1]];
				break;
			case 38:
				bulletHeader = [this.header[0],this.header[1]-1];
				break;
			case 39:
				bulletHeader = [this.header[0]+1,this.header[1]];
				break;
			case 40:
				bulletHeader = [this.header[0],this.header[1]+1];
				break;
			default :
				bulletHeader = [this.header[0],this.header[1]];
		}
		var bullet = new Bullet(bulletHeader, this.direction, bulletSpeed, this);
		bullet.init();
	}
}





