/**
 * Computer's Tank, extends from base Tank
 * @param heart
 * @param direction
 * @constructor
 */
function NPCTank(heart, direction) {
	Tank.call(this, heart, direction);

	this.init = function() {
		var thisTank = this;
		thisTank.draw();
		thisTank.run();
	}

	this.attack = function() {

	}

	this.destroy = function() {
		this.removeDraw();
		this.status = false;
		clearInterval(this.thread);
	}

	this.run = function() {
		var thisTank = this;
		var times = getRandomNum(1, 10);
		var direction = getRandomNum(37, 42);
		var thread;
		switch (direction) {
			case 37:
				var i = 0;
				thread = setInterval(function() {
					if (++i === times || thisTank.moveLeft() == false) {
						clearInterval(thread);
						if (thisTank.status) {
							thisTank.run();
						}
					}
				}, NPCTankSpeed);
				break;
			case 38:
				var i = 0;
				thread = setInterval(function() {
					if (++i === times || thisTank.moveUp() == false) {
						clearInterval(thread);
						if (thisTank.status) {
							thisTank.run();
						}
					}
				}, NPCTankSpeed);
				break;
			case 39:
				var i = 0;
				thread = setInterval(function() {
					if (++i === times || thisTank.moveRight() == false) {
						clearInterval(thread);
						if (thisTank.status) {
							thisTank.run();
						}
					}
				}, NPCTankSpeed);
				break;
			case 40:
				var i = 0;
				thread = setInterval(function() {
					if (++i === times || thisTank.moveDown() == false) {
						clearInterval(thread);
						if (thisTank.status) {
							thisTank.run();
						}
					}
				}, NPCTankSpeed);
				break;
			default :
				thisTank.fire();
				if (thisTank.status) {
					thisTank.run();
				}
				break;
		}
	}

	this.move = function(direction) {
		switch (direction) {
			case 37:
				this.moveLeft();
				break;
			case 38:
				this.moveUp();
				break;
			case 39:
				this.moveRight();
				break;
			case 40:
				this.moveDown();
				break;
			default :
				this.moveLeft();
		}
	}
}

NPCTank.getRandTank = function() {
	var direction = getRandomNum(37,40);
	var x = getRandomNum(2, gridColsNum-1);
	var y = getRandomNum(2, gridRowsNum-1);
	while (jQuery('#tank-grid .row:nth-child('+y+') .col:nth-child('+x+')').hasClass('on')) {
		x = getRandomNum(2, gridColsNum-1);
		y = getRandomNum(2, gridRowsNum-1);
	}
	var tank = new NPCTank([x,y], direction);
	return tank;
}
