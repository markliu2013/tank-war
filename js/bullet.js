function Bullet(coordinate, direction, speed) {
	this.coordinate = coordinate;
	this.direction = direction;
	this.speed = speed;
	this.moveThread = null;
	this.init = function() {
		dome.get("#tank-grid .row:nth-child("+this.coordinate[1]+") .col:nth-child("+this.coordinate[0]+")").addClass("on");
		var thisBullet = this;
		switch (thisBullet.direction) {
			case 37:
				this.moveThread = setInterval(function() {moveLeft.call(thisBullet);}, this.speed);
				break;
			case 38:
				this.moveThread = setInterval(function() {moveUp.call(thisBullet);}, this.speed);
				break;
			case 39:
				this.moveThread = setInterval(function() {moveRight.call(thisBullet);}, this.speed);
				break;
			case 40:
				this.moveThread = setInterval(function() {moveDown.call(thisBullet);}, this.speed);
				break;
		}
	}
	function moveUp() {
		if (this.coordinate[1]-1<0) {
			clearInterval(this.moveThread);
			return;
		}
		dome.get("#tank-grid .row:nth-child("+this.coordinate[1]+") .col:nth-child("+this.coordinate[0]+")").removeClass("on");
		this.coordinate = [this.coordinate[0], this.coordinate[1]-1];
		dome.get("#tank-grid .row:nth-child("+this.coordinate[1]+") .col:nth-child("+this.coordinate[0]+")").addClass("on");
	}
	function moveDown() {
		if (this.coordinate[1]+1>gridRowsNum+1) {
			clearInterval(this.moveThread);
			return;
		}
		dome.get("#tank-grid .row:nth-child("+this.coordinate[1]+") .col:nth-child("+this.coordinate[0]+")").removeClass("on");
		this.coordinate = [this.coordinate[0], this.coordinate[1]+1];
		dome.get("#tank-grid .row:nth-child("+this.coordinate[1]+") .col:nth-child("+this.coordinate[0]+")").addClass("on");
	}
	function moveLeft() {
		if (this.coordinate[0]-1<0) {
			clearInterval(this.moveThread);
			return;
		}
		dome.get("#tank-grid .row:nth-child("+this.coordinate[1]+") .col:nth-child("+this.coordinate[0]+")").removeClass("on");
		this.coordinate = [this.coordinate[0]-1, this.coordinate[1]];
		dome.get("#tank-grid .row:nth-child("+this.coordinate[1]+") .col:nth-child("+this.coordinate[0]+")").addClass("on");
	}
	function moveRight() {
		if (this.coordinate[0]+1>gridColsNum+1) {
			clearInterval(this.moveThread);
			return;
		}
		dome.get("#tank-grid .row:nth-child("+this.coordinate[1]+") .col:nth-child("+this.coordinate[0]+")").removeClass("on");
		this.coordinate = [this.coordinate[0]+1, this.coordinate[1]];
		dome.get("#tank-grid .row:nth-child("+this.coordinate[1]+") .col:nth-child("+this.coordinate[0]+")").addClass("on");
	}

}