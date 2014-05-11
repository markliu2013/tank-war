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
	this.status = true;// alive or die, true is alive, false is die.
	this.init = function() {
		jQuery("#tank-grid .row:nth-child("+this.coordinate[1]+") .col:nth-child("+this.coordinate[0]+")").addClass("on bull");
		if (this.tank.constructor == MyTank) {
			jQuery("#tank-grid .row:nth-child("+this.coordinate[1]+") .col:nth-child("+this.coordinate[0]+")").addClass("my");
		}
		var thisBullet = this;
		switch (thisBullet.direction) {
			case 37:
				this.moveThread = setInterval(function() { moveLeft.call(thisBullet);}, this.speed);
				break;
			case 38:
				this.moveThread = setInterval(function() { moveUp.call(thisBullet);}, this.speed);
				break;
			case 39:
				this.moveThread = setInterval(function() { moveRight.call(thisBullet);}, this.speed);
				break;
			case 40:
				this.moveThread = setInterval(function() { moveDown.call(thisBullet);}, this.speed);
				break;
		}
	}

	function moveCheck(nextBullDome, preBullDome) {
		if (nextBullDome.hasClass("on")) {
			if (nextBullDome.hasClass("tank")) {
				var tank = tankContainer.checkWhichTank(this.coordinate);
				tank.destroy();
				preBullDome.removeClass("on").removeClass("bull");
				if (this.tank.constructor == MyTank) {
					preBullDome.removeClass("my");
				}
				this.destroy();
			} else if (nextBullDome.hasClass("bull")) {
				if (nextBullDome.hasClass("stopped")) {
					preBullDome.removeClass("on").removeClass("bull");
					if (this.tank.constructor == MyTank) {
						preBullDome.removeClass("my");
					}
					this.destroy();
				} else {
					preBullDome.addClass("stopped");
					clearInterval(this.moveThread);
					this.status = false;
				}
			}
		} else {
			preBullDome.removeClass("on").removeClass("bull");
			nextBullDome.addClass("on bull");
			if (this.tank.constructor == MyTank) {
				preBullDome.removeClass("my");
				nextBullDome.addClass("my");
			}
		}
	}

	function moveUp() {
		if (this.coordinate[1]-1<0) {
			this.destroy();
			return;
		}
		var preCoordinate = this.coordinate;
		var preBullDome = jQuery("#tank-grid .row:nth-child("+preCoordinate[1]+") .col:nth-child("+preCoordinate[0]+")");
		this.coordinate = [this.coordinate[0], this.coordinate[1]-1];
		var nextBullDome = jQuery("#tank-grid .row:nth-child("+this.coordinate[1]+") .col:nth-child("+this.coordinate[0]+")");
		moveCheck.call(this, nextBullDome, preBullDome);
	}
	function moveDown() {
		if (this.coordinate[1]+1>gridRowsNum+1) {
			this.destroy();
			return;
		}
		var preCoordinate = this.coordinate;
		var preBullDome = jQuery("#tank-grid .row:nth-child("+preCoordinate[1]+") .col:nth-child("+preCoordinate[0]+")");
		this.coordinate = [this.coordinate[0], this.coordinate[1]+1];
		var nextBullDome = jQuery("#tank-grid .row:nth-child("+this.coordinate[1]+") .col:nth-child("+this.coordinate[0]+")");
		moveCheck.call(this, nextBullDome, preBullDome);
	}
	function moveLeft() {
		if (this.coordinate[0]-1<0) {
			this.destroy();
			return;
		}
		var preCoordinate = this.coordinate;
		var preBullDome = jQuery("#tank-grid .row:nth-child("+preCoordinate[1]+") .col:nth-child("+preCoordinate[0]+")");
		this.coordinate = [this.coordinate[0]-1, this.coordinate[1]];
		var nextBullDome = jQuery("#tank-grid .row:nth-child("+this.coordinate[1]+") .col:nth-child("+this.coordinate[0]+")");
		moveCheck.call(this, nextBullDome, preBullDome);
	}
	function moveRight() {
		if (this.coordinate[0]+1>gridColsNum+1) {
			this.destroy();
			return;
		}
		var preCoordinate = this.coordinate;
		var preBullDome = jQuery("#tank-grid .row:nth-child("+preCoordinate[1]+") .col:nth-child("+preCoordinate[0]+")");
		this.coordinate = [this.coordinate[0]+1, this.coordinate[1]];
		var nextBullDome = jQuery("#tank-grid .row:nth-child("+this.coordinate[1]+") .col:nth-child("+this.coordinate[0]+")");
		moveCheck.call(this, nextBullDome, preBullDome);
	}

	this.destroy = function() {
		clearInterval(this.moveThread);
		jQuery("#tank-grid .row:nth-child("+this.coordinate[1]+") .col:nth-child("+this.coordinate[0]+")").removeClass("on").removeClass("bull");
		if (this.tank.constructor == MyTank) {
			jQuery("#tank-grid .row:nth-child("+this.coordinate[1]+") .col:nth-child("+this.coordinate[0]+")").removeClass("my");
		}
		this.status = false;
	}

}
