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

}

Bullet.prototype.moveCheck = function(nextBullDome, preBullDome) {
	if (nextBullDome.hasClass('on')) {
		if (nextBullDome.hasClass('tank')) {
			var tank = game.tankContainer.checkWhichTank(this.coordinate);
			if (tank) {
				tank.destroy();
				if (tank.constructor == MyTank) {
					game.stopGame();
				} else if (this.tank.constructor == MyTank) {
					game.addScore();
				}
			}
			preBullDome.removeClass('on').removeClass('bull');
			if (this.tank.constructor == MyTank) {
				preBullDome.removeClass('my');
			}
			this.destroy();
		} else if (nextBullDome.hasClass('bull')) {
			if (nextBullDome.hasClass('stopped')) {
				preBullDome.removeClass('on').removeClass('bull');
				if (this.tank.constructor == MyTank) {
					preBullDome.removeClass('my');
				}
				this.destroy();
			} else {
				preBullDome.addClass('stopped');
				clearInterval(this.moveThread);
				this.status = false;
			}
		}
	} else {
		preBullDome.removeClass('on').removeClass('bull');
		nextBullDome.addClass('on bull');
		if (this.tank.constructor == MyTank) {
			preBullDome.removeClass('my');
			nextBullDome.addClass('my');
		}
	}
}
Bullet.prototype.destroy = function() {
	clearInterval(this.moveThread);
	jQuery('#tank-grid .row:nth-child('+this.coordinate[1]+') .col:nth-child('+this.coordinate[0]+')').removeClass('on').removeClass('bull');
	if (this.tank.constructor == MyTank) {
		jQuery('#tank-grid .row:nth-child('+this.coordinate[1]+') .col:nth-child('+this.coordinate[0]+')').removeClass('my');
	}
	this.status = false;
}
Bullet.prototype.moveDown = function() {
	if (this.coordinate[1]+1 > gridRowsNum+1) {
		this.destroy();
		return;
	}
	var preCoordinate = this.coordinate;
	var preBullDome = jQuery('#tank-grid .row:nth-child('+preCoordinate[1]+') .col:nth-child('+preCoordinate[0]+')');
	this.coordinate = [this.coordinate[0], this.coordinate[1]+1];
	var nextBullDome = jQuery('#tank-grid .row:nth-child('+this.coordinate[1]+') .col:nth-child('+this.coordinate[0]+')');
	this.moveCheck(nextBullDome, preBullDome);
}
Bullet.prototype.moveUp = function() {
	if (this.coordinate[1]-1 < 0) {
		this.destroy();
		return;
	}
	var preCoordinate = this.coordinate;
	var preBullDome = jQuery('#tank-grid .row:nth-child('+preCoordinate[1]+') .col:nth-child('+preCoordinate[0]+')');
	this.coordinate = [this.coordinate[0], this.coordinate[1]-1];
	var nextBullDome = jQuery('#tank-grid .row:nth-child('+this.coordinate[1]+') .col:nth-child('+this.coordinate[0]+')');
	this.moveCheck(nextBullDome, preBullDome);
}
Bullet.prototype.moveRight = function() {
	if (this.coordinate[0]+1 > gridColsNum+1) {
		this.destroy();
		return;
	}
	var preCoordinate = this.coordinate;
	var preBullDome = jQuery('#tank-grid .row:nth-child('+preCoordinate[1]+') .col:nth-child('+preCoordinate[0]+')');
	this.coordinate = [this.coordinate[0]+1, this.coordinate[1]];
	var nextBullDome = jQuery('#tank-grid .row:nth-child('+this.coordinate[1]+') .col:nth-child('+this.coordinate[0]+')');
	this.moveCheck(nextBullDome, preBullDome);
}

Bullet.prototype.moveLeft = function() {
	if (this.coordinate[0]-1 < 0) {
		this.destroy();
		return;
	}
	var preCoordinate = this.coordinate;
	var preBullDome = jQuery('#tank-grid .row:nth-child('+preCoordinate[1]+') .col:nth-child('+preCoordinate[0]+')');
	this.coordinate = [this.coordinate[0]-1, this.coordinate[1]];
	var nextBullDome = jQuery('#tank-grid .row:nth-child('+this.coordinate[1]+') .col:nth-child('+this.coordinate[0]+')');
	this.moveCheck(nextBullDome, preBullDome);
}

Bullet.prototype.init = function() {
	jQuery('#tank-grid .row:nth-child('+this.coordinate[1]+') .col:nth-child('+this.coordinate[0]+')').addClass('on bull');
	if (this.tank.constructor == MyTank) {
		jQuery('#tank-grid .row:nth-child('+this.coordinate[1]+') .col:nth-child('+this.coordinate[0]+')').addClass('my');
	}
	var thisBullet = this;
	switch (thisBullet.direction) {
		case 37:
			thisBullet.moveThread = setInterval(function() { thisBullet.moveLeft();}, thisBullet.speed);
			break;
		case 38:
			thisBullet.moveThread = setInterval(function() { thisBullet.moveUp();}, thisBullet.speed);
			break;
		case 39:
			thisBullet.moveThread = setInterval(function() { thisBullet.moveRight();}, thisBullet.speed);
			break;
		case 40:
			thisBullet.moveThread = setInterval(function() { thisBullet.moveDown();}, thisBullet.speed);
			break;
	}
}
