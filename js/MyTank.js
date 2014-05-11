/**
 * Player's tank, extends from base Tank
 * @param header
 * @param direction
 * @constructor
 */
function MyTank(header, direction) {
	Tank.call(this, header, direction);
	this.draw = function() {
		if (this.status) {
			var dataArr = this.getDataArr();
			for(var i=0; i<dataArr.length; i++) {
				jQuery("#tank-grid .row:nth-child("+dataArr[i][1]+") .col:nth-child("+dataArr[i][0]+")").addClass("on tank my");
			}
		}
	}
	this.removeDraw = function() {
		var dataArr = this.getDataArr();
		for(var i=0; i<dataArr.length; i++) {
			jQuery("#tank-grid  .row:nth-child("+dataArr[i][1]+") .col:nth-child("+dataArr[i][0]+")").removeClass("on").removeClass("tank").removeClass("my");
		}
	}
	this.keyBoardControl = function() {
		var thisTank = this;
		jQuery(document).on("keydown", function(event) {
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
		});
		jQuery(document).on("keyup", function(event) {
			if (event.keyCode == 32) {
				thisTank.fire();
				event.preventDefault();
			}
		});
	}
	this.init = function() {
		this.draw();
		this.keyBoardControl();
	}
}