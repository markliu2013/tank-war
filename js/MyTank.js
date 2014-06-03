/**
 * Player's tank, extends from base Tank
 * @param heart
 * @param direction
 * @constructor
 */
function MyTank(heart, direction) {
	Tank.call(this, heart, direction);
	var thisTank = this;
	this.draw = function() {
		var dataArr = this.getDataArr();
		for(var i=0; i<dataArr.length; i++) {
			jQuery('#tank-grid .row:nth-child('+dataArr[i][1]+') .col:nth-child('+dataArr[i][0]+')').addClass('on tank my');
		}
	}
	this.removeDraw = function() {
		var dataArr = this.getDataArr();
		for(var i=0; i<dataArr.length; i++) {
			jQuery('#tank-grid  .row:nth-child('+dataArr[i][1]+') .col:nth-child('+dataArr[i][0]+')').removeClass('on').removeClass('tank').removeClass('my');
		}
	}

	this.moveByKey = function(event) {
		if (event.keyCode == 37) { //left
			thisTank.moveLeft();
			event.preventDefault();
		} else if (event.keyCode == 38) { //up
			thisTank.moveUp();
			event.preventDefault();
		} else if (event.keyCode == 39) { //right
			thisTank.moveRight();
			event.preventDefault();
		} else if (event.keyCode == 40) { //down
			thisTank.moveDown();
			event.preventDefault();
		}
	}
	this.fireByKey = function(event) {
		if (event.keyCode == 32) {
			thisTank.fire();
			event.preventDefault();
		}
	}
	this.keyBoardControl = function() {
		var thisTank = this;
		jQuery(document).on('keydown', thisTank.moveByKey);
		jQuery(document).on('keyup', thisTank.fireByKey);
	}
	this.offKey = function() {
		var thisTank = this;
		jQuery(document).off('keydown', thisTank.moveByKey);
		jQuery(document).off('keyup', thisTank.fireByKey);
	}
	this.init = function() {
		this.draw();
		this.keyBoardControl();
	}
}