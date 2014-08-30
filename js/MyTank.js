/**
 * Player's tank, extends from base Tank
 * @param heart
 * @param direction
 * @constructor
 */
function MyTank(heart, direction) {

	Tank.apply(this, arguments);

}

MyTank.prototype = new Tank();
MyTank.prototype.constructor = MyTank;

MyTank.prototype.draw = function() {
	var dataArr = this.getDataArr();
	for(var i=0; i<dataArr.length; i++) {
		jQuery('#tank-grid .row:nth-child('+dataArr[i][1]+') .col:nth-child('+dataArr[i][0]+')').addClass('on tank my');
	}
}
MyTank.prototype.removeDraw = function() {
	var dataArr = this.getDataArr();
	for(var i=0; i<dataArr.length; i++) {
		jQuery('#tank-grid  .row:nth-child('+dataArr[i][1]+') .col:nth-child('+dataArr[i][0]+')').removeClass('on').removeClass('tank').removeClass('my');
	}
}
MyTank.prototype.moveByKey = function(event) {
	if (event.keyCode == 37 || event.keyCode == 38 || event.keyCode == 39  || event.keyCode == 40 ) {
		Tank.prototype.move.call(game.myTank, event.keyCode);
		event.preventDefault();
	}
}
MyTank.prototype.fireByKey = function(event) {
	if (event.keyCode == 32) {
		Tank.prototype.fire.call(game.myTank);
		event.preventDefault();
	}
}
MyTank.prototype.keyBoardControl = function() {
	jQuery(document).on('keydown', this.moveByKey);
	jQuery(document).on('keyup', this.fireByKey);
}
MyTank.prototype.offKey = function() {
	jQuery(document).off('keydown', this.moveByKey);
	jQuery(document).off('keyup', this.fireByKey);
}
MyTank.prototype.init = function() {
	this.draw();
	this.keyBoardControl();
}
MyTank.prototype.reset = function() {
	this.heart = [Math.ceil(gridColsNum/2),Math.ceil(gridRowsNum/2)];
	this.direction = getRandomNum(37, 40);
	this.status = true;
	this.removeDraw();
	this.draw();
}