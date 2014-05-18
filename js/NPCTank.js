/**
 * Computer's Tank, extends from base Tank
 * @param heart
 * @param direction
 * @constructor
 */
function NPCTank(heart, direction) {
	Tank.call(this, heart, direction);
	this.thread = null;

	this.init = function() {
		this.draw();
	}
}
NPCTank.prototype.getRandTank = function() {
	var dir = getRandomNum(37,40);
	var heart = [];
	switch (dir) {
		case 37:
			break;
		case 38:
			break;
		case 39:
			break;
		case 40:
			break;
		default :
			break;
	}
	var tank = NPCTank(heart, dir);
}
