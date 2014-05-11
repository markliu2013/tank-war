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
	function moveUp() {
		if (this.coordinate[1]-1<0) {
			this.destroy();
			return;
		}
		if (this.tank.constructor == MyTank) {
			jQuery("#tank-grid .row:nth-child("+this.coordinate[1]+") .col:nth-child("+this.coordinate[0]+")").removeClass("on").removeClass("bull").removeClass("my");
			this.coordinate = [this.coordinate[0], this.coordinate[1]-1];
			var nextBullDome = jQuery("#tank-grid .row:nth-child("+this.coordinate[1]+") .col:nth-child("+this.coordinate[0]+")");
			if (nextBullDome.hasClass("on")) {
				if (nextBullDome.hasClass("tank")) {
					var tank = tankContainer.checkWhichTank(this.coordinate);
					tank.destroy();
					this.destroy();
				} else if (nextBullDome.hasClass("bull")) {
					var bullet = bulletContainer.checkWhichBullet(this.coordinate);
					clearInterval(bullet.moveThread);
					this.destroy();
				}
				return;
			} else {
				nextBullDome.addClass("on bull my");
			}
		} else {
			var preCoordinate = this.coordinate;
			var preBullDome = jQuery("#tank-grid .row:nth-child("+preCoordinate[1]+") .col:nth-child("+preCoordinate[0]+")")
			this.coordinate = [this.coordinate[0], this.coordinate[1]-1];
			var nextBullDome = jQuery("#tank-grid .row:nth-child("+this.coordinate[1]+") .col:nth-child("+this.coordinate[0]+")");
			if (nextBullDome.hasClass("on")) {
				if (nextBullDome.hasClass("tank")) {
					var tank = tankContainer.checkWhichTank(this.coordinate);
					tank.destroy();
					this.destroy();
					jQuery("#tank-grid .row:nth-child("+preCoordinate[1]+") .col:nth-child("+preCoordinate[0]+")").removeClass("on").removeClass("bull");
				} else if (nextBullDome.hasClass("bull")) {
					if (nextBullDome.hasClass("stopped")) {
						this.destroy();
						jQuery("#tank-grid .row:nth-child("+preCoordinate[1]+") .col:nth-child("+preCoordinate[0]+")").removeClass("on").removeClass("bull").removeClass("my");
					} else {
						preBullDome.addClass("stopped");
						clearInterval(this.moveThread);
						this.status = false;
					}
				}
			} else {
				preBullDome.removeClass("on").removeClass("bull");
				nextBullDome.addClass("on bull");
			}
		}
	}
	function moveDown() {
		if (this.coordinate[1]+1>gridRowsNum+1) {
			this.destroy();
			return;
		}
		if (this.tank.constructor == MyTank) {
			var preCoordinate = this.coordinate;
			var preBullDome = jQuery("#tank-grid .row:nth-child("+preCoordinate[1]+") .col:nth-child("+preCoordinate[0]+")")
			this.coordinate = [this.coordinate[0], this.coordinate[1]+1];
			var nextBullDome = jQuery("#tank-grid .row:nth-child("+this.coordinate[1]+") .col:nth-child("+this.coordinate[0]+")");
			if (nextBullDome.hasClass("on")) {
				if (nextBullDome.hasClass("tank")) {
					var tank = tankContainer.checkWhichTank(this.coordinate);
					tank.destroy();
					this.destroy();
					jQuery("#tank-grid .row:nth-child("+preCoordinate[1]+") .col:nth-child("+preCoordinate[0]+")").removeClass("on").removeClass("bull").removeClass("my");
				} else if (nextBullDome.hasClass("bull")) {
					if (nextBullDome.hasClass("stopped")) {
						this.destroy();
						jQuery("#tank-grid .row:nth-child("+preCoordinate[1]+") .col:nth-child("+preCoordinate[0]+")").removeClass("on").removeClass("bull").removeClass("my");
					} else {
						preBullDome.addClass("stopped");
						clearInterval(this.moveThread);
						this.status = false;
					}
				}
				return;
			} else {
				preBullDome.removeClass("on").removeClass("bull").removeClass("my");
				nextBullDome.addClass("on bull my");
			}
		} else {
			var preCoordinate = this.coordinate;
			var preBullDome = jQuery("#tank-grid .row:nth-child("+preCoordinate[1]+") .col:nth-child("+preCoordinate[0]+")")
			this.coordinate = [this.coordinate[0], this.coordinate[1]+1];
			var nextBullDome = jQuery("#tank-grid .row:nth-child("+this.coordinate[1]+") .col:nth-child("+this.coordinate[0]+")");
			if (nextBullDome.hasClass("on")) {
				if (nextBullDome.hasClass("tank")) {
					var tank = tankContainer.checkWhichTank(this.coordinate);
					tank.destroy();
					this.destroy();
					jQuery("#tank-grid .row:nth-child("+preCoordinate[1]+") .col:nth-child("+preCoordinate[0]+")").removeClass("on").removeClass("bull");
				} else if (nextBullDome.hasClass("bull")) {
					if (nextBullDome.hasClass("stopped")) {
						this.destroy();
					} else {
						preBullDome.addClass("stopped");
						clearInterval(this.moveThread);
						this.status = false;
					}
				}
				return;
			} else {
				preBullDome.removeClass("on").removeClass("bull");
				nextBullDome.addClass("on bull");
			}
		}
	}
	function moveLeft() {
		if (this.coordinate[0]-1<0) {
			this.destroy();
			return;
		}
		if (this.tank.constructor == MyTank) {
			jQuery("#tank-grid .row:nth-child("+this.coordinate[1]+") .col:nth-child("+this.coordinate[0]+")").removeClass("on").removeClass("bull").removeClass("my");
			this.coordinate = [this.coordinate[0]-1, this.coordinate[1]];
			var nextBullDome = jQuery("#tank-grid .row:nth-child("+this.coordinate[1]+") .col:nth-child("+this.coordinate[0]+")");
			if (nextBullDome.hasClass("on")) {
				clearInterval(this.moveThread);
				if (nextBullDome.hasClass("tank")) {
					var tank = tankContainer.checkWhichTank(this.coordinate);
					tank.removeDraw();
					tank.status = false;
				} else if (nextBullDome.hasClass("bull")) {
					var bullet = bulletContainer.checkWhichBullet(this.coordinate);
					clearInterval(bullet.moveThread);
					this.destroy();
				}
				return;
			} else {
				nextBullDome.addClass("on bull my");
			}
		} else {
			jQuery("#tank-grid .row:nth-child("+this.coordinate[1]+") .col:nth-child("+this.coordinate[0]+")").removeClass("on").removeClass("bull");
			this.coordinate = [this.coordinate[0]-1, this.coordinate[1]];
			var nextBullDome = jQuery("#tank-grid .row:nth-child("+this.coordinate[1]+") .col:nth-child("+this.coordinate[0]+")");
			if (nextBullDome.hasClass("on")) {
				clearInterval(this.moveThread);
				if (nextBullDome.hasClass("tank")) {
					var tank = tankContainer.checkWhichTank(this.coordinate);
					tank.removeDraw();
					tank.status = false;
				} else if (nextBullDome.hasClass("bull")) {
					var bullet = bulletContainer.checkWhichBullet(this.coordinate);
					clearInterval(bullet.moveThread);
					this.destroy();
				}
				return;
			} else {
				nextBullDome.addClass("on bull");
			}
		}
	}
	function moveRight() {
		if (this.coordinate[0]+1>gridColsNum+1) {
			this.destroy();
			return;
		}
		if (this.tank.constructor == MyTank) {
			jQuery("#tank-grid .row:nth-child("+this.coordinate[1]+") .col:nth-child("+this.coordinate[0]+")").removeClass("on").removeClass("bull").removeClass("my");
			this.coordinate = [this.coordinate[0]+1, this.coordinate[1]];
			var nextBullDome = jQuery("#tank-grid .row:nth-child("+this.coordinate[1]+") .col:nth-child("+this.coordinate[0]+")");
			if (nextBullDome.hasClass("on")) {
				clearInterval(this.moveThread);
				if (nextBullDome.hasClass("tank")) {
					var tank = tankContainer.checkWhichTank(this.coordinate);
					tank.removeDraw();
					tank.status = false;
				} else if (nextBullDome.hasClass("bull")) {
					var bullet = bulletContainer.checkWhichBullet(this.coordinate);
					clearInterval(bullet.moveThread);
					this.destroy();
				}
				return;
			} else {
				nextBullDome.addClass("on bull my");
			}
		} else {
			jQuery("#tank-grid .row:nth-child("+this.coordinate[1]+") .col:nth-child("+this.coordinate[0]+")").removeClass("on").removeClass("bull");
			this.coordinate = [this.coordinate[0]+1, this.coordinate[1]];
			var nextBullDome = jQuery("#tank-grid .row:nth-child("+this.coordinate[1]+") .col:nth-child("+this.coordinate[0]+")");
			if (nextBullDome.hasClass("on")) {
				clearInterval(this.moveThread);
				if (nextBullDome.hasClass("tank")) {
					var tank = tankContainer.checkWhichTank(this.coordinate);
					tank.removeDraw();
					tank.status = false;
				} else if (nextBullDome.hasClass("bull")) {
					var bullet = bulletContainer.checkWhichBullet(this.coordinate);
					clearInterval(bullet.moveThread);
					this.destroy();
				}
				return;
			} else {
				nextBullDome.addClass("on bull");
			}
		}
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
