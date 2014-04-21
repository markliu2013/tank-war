/**
 * Class Bullet
 * @param coordinate
 * @param direction
 * @param speed
 * @param tank
 * @constructor
 */
function Bullet(coordinate, direction, speed, tank) {
	this.coordinate = coordinate;
	this.direction = direction;
	this.speed = speed;
	this.tank = tank;
	this.moveThread = null;
	this.init = function() {
		dome.get("#tank-grid .row:nth-child("+this.coordinate[1]+") .col:nth-child("+this.coordinate[0]+")").addClass("on bull");
		if (this.tank.constructor == MyTank) {
			dome.get("#tank-grid .row:nth-child("+this.coordinate[1]+") .col:nth-child("+this.coordinate[0]+")").addClass("my");
		}
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
		dome.get("#tank-grid .row:nth-child("+this.coordinate[1]+") .col:nth-child("+this.coordinate[0]+")").removeClass("on").removeClass("bull");
		this.coordinate = [this.coordinate[0], this.coordinate[1]-1];
		dome.get("#tank-grid .row:nth-child("+this.coordinate[1]+") .col:nth-child("+this.coordinate[0]+")").addClass("on bull");
	}
	function moveDown() {
		if (this.coordinate[1]+1>gridRowsNum+1) {
			clearInterval(this.moveThread);
			return;
		}
		dome.get("#tank-grid .row:nth-child("+this.coordinate[1]+") .col:nth-child("+this.coordinate[0]+")").removeClass("on").removeClass("bull");
		this.coordinate = [this.coordinate[0], this.coordinate[1]+1];
		dome.get("#tank-grid .row:nth-child("+this.coordinate[1]+") .col:nth-child("+this.coordinate[0]+")").addClass("on bull");
	}
	function moveLeft() {
		if (this.coordinate[0]-1<0) {
			clearInterval(this.moveThread);
			return;
		}
		dome.get("#tank-grid .row:nth-child("+this.coordinate[1]+") .col:nth-child("+this.coordinate[0]+")").removeClass("on").removeClass("bull");
		this.coordinate = [this.coordinate[0]-1, this.coordinate[1]];
		dome.get("#tank-grid .row:nth-child("+this.coordinate[1]+") .col:nth-child("+this.coordinate[0]+")").addClass("on bull");
	}
	function moveRight() {
		if (this.coordinate[0]+1>gridColsNum+1) {
			clearInterval(this.moveThread);
			return;
		}
		dome.get("#tank-grid .row:nth-child("+this.coordinate[1]+") .col:nth-child("+this.coordinate[0]+")").removeClass("on").removeClass("bull");
		this.coordinate = [this.coordinate[0]+1, this.coordinate[1]];
		var nextBullDome = dome.get("#tank-grid .row:nth-child("+this.coordinate[1]+") .col:nth-child("+this.coordinate[0]+")");
		if (nextBullDome.hasClass("on")) {
			clearInterval(this.moveThread);
			var tank = tankContainer.checkWhichTank(this.coordinate);
			tank.removeDraw();
			return;
		} else {
			nextBullDome.addClass("on bull");
		}
	}


}