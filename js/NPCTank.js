/**
 * Computer's Tank, extends from base Tank
 * @param header
 * @param direction
 * @constructor
 */
function NPCTank(header, direction) {
	Tank.call(this, header, direction);


	this.init = function() {
		this.draw();
	}
}