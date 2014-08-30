/**
 * Computer's Tank, extends from base Tank
 * @param heart
 * @param direction
 * @constructor
 */
function NPCTank(heart, direction) {

	Tank.apply(this, arguments);
	this.thread = null;

}

NPCTank.prototype = new Tank();
NPCTank.prototype.constructor = NPCTank;

NPCTank.prototype.init = function() {
	this.draw();
	this.run();
}

NPCTank.prototype.attack = function() {

}

NPCTank.prototype.destroy = function() {
	this.removeDraw();
	this.status = false;
	clearInterval(this.thread);
}

NPCTank.prototype.run = function() {
	if (game.status != 1) {return;}
	var thisTank = this;
	var times = getRandomNum(1, 10);
	var direction = getRandomNum(37, 40+NPCTankFireTimes);//随机生成的指令，不仅是方向，还包括fire
	if (direction == 37 || direction == 38 || direction == 39 || direction == 40) {
		var i = 0;
		thisTank.thread = setInterval(function() {
			if (++i === times || thisTank.move(direction) == false) {
				clearInterval(thisTank.thread);
				if (thisTank.status) {
					thisTank.run();
				}
			}
		}, NPCTankSpeed);
	} else {
		thisTank.fire();
		if (thisTank.status) {
			thisTank.run();
		}
	}
}
NPCTank.getRandTank = function() {
	var direction = getRandomNum(37,40);
	var x = getRandomNum(2, gridColsNum-1);
	var y = getRandomNum(2, gridRowsNum-1);
	while (
		jQuery('#tank-grid .row:nth-child('+(y-1)+') .col:nth-child('+(x-1)+')').hasClass('on') ||
		jQuery('#tank-grid .row:nth-child('+(y-1)+') .col:nth-child('+x+')').hasClass('on') ||
		jQuery('#tank-grid .row:nth-child('+(y-1)+') .col:nth-child('+(x+1)+')').hasClass('on') ||
		jQuery('#tank-grid .row:nth-child('+y+') .col:nth-child('+(x-1)+')').hasClass('on') ||
		jQuery('#tank-grid .row:nth-child('+y+') .col:nth-child('+x+')').hasClass('on') ||
		jQuery('#tank-grid .row:nth-child('+y+') .col:nth-child('+(x+1)+')').hasClass('on') ||
		jQuery('#tank-grid .row:nth-child('+(y+1)+') .col:nth-child('+(x-1)+')').hasClass('on') ||
		jQuery('#tank-grid .row:nth-child('+(y+1)+') .col:nth-child('+x+')').hasClass('on') ||
		jQuery('#tank-grid .row:nth-child('+(y+1)+') .col:nth-child('+(x+1)+')').hasClass('on')
	) {
		x = getRandomNum(2, gridColsNum-1);
		y = getRandomNum(2, gridRowsNum-1);
	}
	var tank = new NPCTank([x,y], direction);
	return tank;
}

